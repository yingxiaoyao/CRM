<template>
    <div class="addCustomer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>添加客戶</Breadcrumb-item>
        </Breadcrumb>
        
       <Form ref="customer" :model="customer" :rules="ruleValidate" :label-width="80" class='fileHandle'>
           <Row>
               <Col span="24" class='span8'>
                   <Form-item label="客户名称" prop="name">
                       <Input v-model="customer.name" placeholder="请输入姓名" disabled style='width : 200px;'></Input>
                       <Button type="warning" @click='select'>请选择</Button>
                   </Form-item>
               </Col>
               <Col span="8" class='span8'>
                   <Form-item label="联系人" prop="people">
                       <Input v-model="customer.people" disabled ></Input>
                   </Form-item>
               </Col>
               <Col span="8" class='span8'>
                   <Form-item label="电话" prop="phone">
                       <Input v-model="customer.phone" disabled ></Input>
                   </Form-item>
               </Col>
               
               <Col span="16" class='span8'>
                   <Form-item label="地址" prop="addr">
                       <Input v-model="customer.addr" disabled ></Input>
                   </Form-item>
               </Col>
               <Col span="16" class='span8'>
                   <Form-item label="申请理由" prop="applyReason">
                       <Input v-model="customer.applyReason" type="textarea" :autosize="{minRows: 5,maxRows: 10}" placeholder="请输入..."></Input>
                   </Form-item>
               </Col>

           </Row>
       </Form>
       <div class="appendixUpload">
           <label class="uploadLabel" style='width:80px;text-align:right;'>相关文件</label>
           <Upload :action="uploadUrl" class='inline-block' 
               :on-success="attachmentsSuccess" :headers='uploadHeader' :data='uploadData'
               :default-file-list="defaultList" :on-remove='handleRemoveUpload' :before-upload="handleBeforeUpload">
               <Button type="ghost" icon="ios-cloud-upload-outline">添加附件</Button>
           </Upload>
       </div>
           <Row type="flex" justify="center" class="code-row-bg addFooter">
               <Button type="info" @click="handleSubmit('customer')">保存</Button>
               <Button type="info" @click="handleReset('customer')" style="margin-left: 8px">提交审核</Button>
           </Row>


       <Modal
           v-model="customerListModel"
           title="选择客户"
           width='800'
          >
          <Row>
              <Col span='24'>
                 <span>公司名称：</span>
                 <Input placeholder="商品名称/编码" style="width: 230px" v-model='name'></Input>
                      
                 <Button type="warning"  >查询</Button>
              
              </Col>
          </Row>
          <div class="fileHandle">
                <Table :columns="tableModle" :data="customerList"></Table>
          </div>
            <Row class="fileHandle" type="flex" justify="end">
               <Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
           </Row>
       </Modal>
         

    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name :'addCustomer',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };
        

        
    },
    data () {
        return {
            DOM : {},
            customer: {
                customerId: '',
                name : '',
                people: '',
                phone : '',
                addr : '',
                applyReason: '',
                attachmentName : '',    // 附件名称
                attachmentUrl : '',     // 附件地址
            },
            ruleValidate: {
                applyReason: [
                    { type: 'string', max: 1000, message: '申请理由最多1000个字', trigger: 'change' }
                ]
            },
            customerListModel : false,
            uploadUrl : 'http://lookat.soonergz.com:8888/easycrm/api/common/fileUpload.do',
            uploadData : {path : 'product'},

            defaultList: [],
            uploadList : [],

            name : '',
            tableModle : [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    key: 'customerCorpName'
                },
                {
                    title: '联系人',
                    key: 'applyUserName'
                },
                {
                    title: '电话',
                    key: 'applyTime'
                },
                {
                    title: '地址',
                    key: 'applyName'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="text" size="small" @click="modify(row)">查看</i-button>`;
                    }
                }

            ],
            customerList : [],
            total : 30,
        }
    },
    computed : {
        uploadHeader : function() {
            const tokenId = this.$store.state.token;
            return {
                token_id : tokenId
            }
        }
    },
    methods: {
        select () {
            this.customerListModel = true;
        },
        attachmentsSuccess (res,file,fileList) {
             console.log(res);
             const attachment = {
                  fileName : res.fileName,
                  fileType : res.fileSuffix,
                  filePath : res.filePath,
                  url : res.url,
                  orderNum : fileList.length
             }
             this.customer.attachmentName = res.fileName;
             this.customer.attachmentUrl = res.url;
             this.uploadList = fileList;
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 1;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 1 个附件。'
                });
            }
            return check;
        },
        handleRemoveUpload (file,fileList) {
            this.uploadList = fileList;
            console.log(this.uploadList);
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        toPage (count) {
            console.log(count);
        }
    }
}
</script>

<style scoped>
    .addCustomer .appendixUpload label {
        width: 80px;
        text-align: right;
        display: inline-block;
        padding: 10px 12px 10px 0;
        vertical-align: top;
    }
    .addCustomer .appendixUpload .inline-block {
        display: inline-block;
        width : 500px;
    }
</style>