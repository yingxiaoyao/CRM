<template>
    <div class="showCustomer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/customerList'>
                    客户列表
                </router-link>
            </Breadcrumb-item>
            <Breadcrumb-item>申请明细</Breadcrumb-item>
        </Breadcrumb>
    <Form :model="audit"  label-position="left" :label-width="100">
        
        <Row>
            <Col span='8'>
                <Form-item label="客户名称:">
                    <span v-if='customer.customerCorpName'>{{customer.customerCorpName}}</span><span v-else>--</span> 
                </Form-item>
            </Col> 
            <Col span='9'>
                <Form-item label="申请状态:">
                    <span style="font-size:18px;" v-if='customer.applyStatusDispName'>{{customer.applyStatusDispName}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="联系人:">
                    <span v-if='customer.contact'>{{customer.contact}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="电话:">
                    <span v-if='customer.telephone'>{{customer.telephone}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='16'>
                 <Form-item label="地址:">
                    <span v-if='customer.address'>{{customer.address}}</span><span v-else>--</span>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <Form-item label="申请人:">
                    <span v-if='customer.applyUserName'>{{customer.applyUserName}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                 <Form-item label="申请日期:">
                    <span v-if='customer.applyTime'>{{customer.applyTime}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='24'>
                <Form-item label="申请理由:">
                    <span v-if='customer.applyReason'>{{customer.applyReason}}</span><span v-else>--</span>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <Form-item label="审核人:">
                    <span v-if='customer.auditUserName'>{{customer.auditUserName}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='8'>
                <Form-item label="a审核日期:">
                    <span v-if='customer.auditTime'>{{customer.auditTime}}</span><span v-else>--</span>
                </Form-item>
            </Col> 
            <Col span='24'>
                <Form-item label="审核内容:">
                    <span v-if='customer.auditContent'> {{customer.auditContent}}</span><span v-else>--</span>
                </Form-item>
            </Col>
            <Col span='24'>
                <Form-item label="附件:">
                    <img v-if='customer.isImg == 1' :src="customer.attachmentUrl" style="width:200px;height : auto;" @click='showImg'>
                    <a v-else style="color:#09f;" :href="customer.attachmentUrl" title='点击下载'>{{customer.attachmentName}}</a>
                </Form-item>
            </Col>
        </Row>
        <Row>
            <Col span='3' offset="8" style='margin-top:20px;margin-bottom : 20px;'>
               <Button long type="warning" @click.native='back'>返回</Button>
            </Col>
        </Row>
    </Form>

        <Modal title="查看图片" v-model="visible">
            <img :src="imgUrl" v-if="visible" style="width: 100%">
        </Modal>
                     

      
    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name :'showCustomer',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };

        console.log(this.$route.params.id);
        if(!this.$route.params.id) {
            this.$router.go(-1);
        }

        const id = this.$route.params.id;
        this.axios(api.cooperation + id + api.queryById)
           .then(function(res){
               const data = res.data.datas;
               console.log(data);
               _this.customer = data;
           })
           .catch(function(err){
               console.log(err);
           })
        
    },
    data () {
        return {
           customer : {},
           imgUrl : '',
           visible : false,
           audit : {}
        }
    },
    computed : {
        
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        showImg () {
            this.imgUrl = this.customer.attachmentUrl;
            this.visible = true;
        }
    }
}
</script>

<style scoped>
    .ivu-form-item {
        margin: 0;
        margin-top: 10px;

    }
    .ivu-form .ivu-form-item-label {
        font-size: 16px;
        color: #666;
    }
    .ivu-form-item-content {
        font-size: 18px;
        color: #333;
    }

    .addFooter {
        margin-top: 20px;
    }
</style>