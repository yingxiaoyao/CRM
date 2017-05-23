<template>
    <div class="addCustomer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/customerList'>
                    客户列表
                </router-link>
            </Breadcrumb-item>
            <Breadcrumb-item>添加客戶</Breadcrumb-item>
        </Breadcrumb>
        
       <Form ref="customer" :model="customer" :rules="ruleValidate" :label-width="80" class='fileHandle'>
           <Row>
               <Col span="24" class='span8'>
                   <Form-item label="客户名称" prop="name">
                       <Input v-model="customer.name" placeholder="请选择客户" disabled style='width : 200px;'></Input>
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
               <Button type="info" @click="save">保存</Button>
               <Button type="info" @click="submitAudit" style="margin-left: 8px">提交审核</Button>
           </Row>


       <Modal
           v-model="customerListModel"
           title="选择客户"
           width='800'
           @on-ok='selectOk'
          >
          <Row>
              <Col span='24'>
                 <span>公司名称：</span>
                 <Input placeholder="商品名称/编码" style="width: 230px" v-model='name'></Input>
                      
                 <Button type="warning"  >查询</Button>
              
              </Col>
          </Row>
          <div class="fileHandle">
                <!-- <div class="table">
                    <div class="table-header">
                        <div class="table-td">请选择</div>
                        <div class="table-td">客户名称</div>
                        <div class="table-td">联系人</div>
                        <div class="table-td">电话</div>
                        <div class="table-td">地址</div>
                    </div>
                    <div class="table-tbody">
                        <div class="table-tr" v-for='(item,index) in customerList' :key='index'>
                            <div class="table-td">
                                <Checkbox label="香蕉"></Checkbox>
                            </div>
                            <div class="table-td">
                                {{item.name}}
                            </div>
                            <div class="table-td">
                                {{item.contact}}
                            </div>
                            <div class="table-td">
                                {{item.telephone}}
                            </div>
                            <div class="table-td">
                                {{item.address}}
                            </div>
                        </div>
                    </div>
                </div> -->
                <Table :columns="tableModle" :data="customerList" highlight-row @on-current-change='customerSelect'></Table>
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
        this.$store.commit('addCustomerListPage',1);
        this.axios({
            method : 'post',
            url : api.baseCorp + api.queryAllPost,
            data : api.jsonData(this.data)
        })
            .then(function(res){
                console.log(res);
                _this.customerList = res.data.datas.rows;
                _this.total = res.data.datas.total;
            })
            .catch(function(err){
                console.log(err);
            })



        if(this.$route.params.id) {
             const id = this.$route.params.id;
             this.isModify = true;
             this.axios(api.cooperation + id + api.queryById)
                .then(function(res){
                    const data = res.data.datas;
                    _this.customer.id = data.id;
                    _this.customer.name = data.customerCorpName;
                    _this.customer.people = data.applyUserName;
                    // _this.customer.phone = this.selectCust.telephone;
                    // _this.customer.addr = this.selectCust.address;
                    _this.customer.customerId = data.customerCorpId;
                    _this.customer.applyReason = data.applyReason;
                    _this.customer.attachmentName = data.attachmentName;
                    _this.customer.attachmentUrl = data.attachmentUrl;
                    if(data.attachmentName && data.attachmentUrl) {
                        _this.defaultList.push({
                            name : data.attachmentName,
                            url : data.attachmentUrl,
                        });
                        _this.uploadList = _this.defaultList;
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
        }

        
    },
    data () {
        return {
            DOM : {},
            isModify : false,
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
                    title: '客户名称',
                    key: 'name'
                },
                {
                    title: '联系人',
                    key: 'contact'
                },
                {
                    title: '电话',
                    key: 'telephone'
                },
                {
                    title: '地址',
                    key: 'address'
                }

            ],
            selectCust : '',
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
        },
        data :function(){
            return {
                name : this.name,
                pageStart : this.$store.state.page.addCustomerListPage,
                pageNums : this.$store.state.pageNums,
            };
        }
    },
    methods: {
        select () {
            this.customerListModel = true;
        },
        attachmentsSuccess (res,file,fileList) {
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
        customerSelect (data) {
            console.log(data);
            this.selectCust = data;
        },
        selectOk () {
            this.customer.name = this.selectCust.name;
            this.customer.people = this.selectCust.contact;
            this.customer.phone = this.selectCust.telephone;
            this.customer.addr = this.selectCust.address;
            this.customer.customerId = this.selectCust.id;
        },
        toPage (count) {
            const _this = this;
            this.$store.commit('addCustomerListPage',count);

            this.axios({
                method : 'post',
                url : api.baseCorp + api.queryAllPost,
                data : api.jsonData(this.data)
            })
                .then(function(res){
                    console.log(res);
                    _this.customerList = res.data.datas.rows;
                    _this.total = res.data.datas.total;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        save () {
            const _this = this;
            console.log(this.customer);
            if(this.isModify) {
                this.axios({
                    method : 'post',
                    url : api.customer + api.modify,
                    data : api.jsonData(this.customer)
                })
                    .then(function(res){
                        console.log(res);
                        _this.$router.push('customerList');
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }else {
                this.axios({
                    method : 'post',
                    url : api.customer + api.add,
                    data : api.jsonData(this.customer)
                })
                    .then(function(res){
                        _this.$router.push('customerList');
                    })
                    .catch(function(err){
                        console.log(err);
                    })
            }
        },
        submitAudit () {
            const _this = this;
            this.axios({
                method : 'post',
                url : api.customer + api.customerSubmitAudit,
                data : api.jsonData(this.customer)
            })
                .then(function(res){
                    console.log(res);
                     _this.$router.push('customerList');

                })
                .catch(function(err){
                    console.log(err);
                })
        }
    }
}
</script>

<style>
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
    .addCustomer .ivu-table table {
        width: 100%;
    }
    .addCustomer .table-td {
        display: table-cell;
        height: 30px;
        width: auto;
        vertical-align: middle;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding: 10px 20px;
    }
</style>