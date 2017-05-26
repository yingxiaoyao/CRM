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
        <Row>
            <Col span='8'>
                <label>客户名称 ：<span v-if='customer.customerCorpName'>{{customer.customerCorpName}}</span><span v-else>--</span>  </label>
            </Col> 
            <Col span='9'>
                <label class="state">申请状态 ：<span v-if='customer.applyStatusDispName'>{{customer.applyStatusDispName}}</span><span v-else>--</span> </label>
            </Col> 
            <Col span='8'>
                <label>联系人 ：<span v-if='customer.contact'>{{customer.contact}}</span><span v-else>--</span> </label>
            </Col> 
            <Col span='8'>
                <label>电话 ：<span v-if='customer.telephone'>{{customer.telephone}}</span><span v-else>--</span> </label>
            </Col>
            <Col span='16'>
                <label>地址 ：<span v-if='customer.address'>{{customer.address}}</span><span v-else>--</span></label>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <label>申请人 ：<span v-if='customer.applyUserName'>{{customer.applyUserName}}</span><span v-else>--</span> </label>
            </Col> 
            <Col span='8'>
                <label>申请日期 ：<span v-if='customer.applyTime'>{{customer.applyTime}}</span><span v-else>--</span> </label>
            </Col>
            <Col span='24'>
                <label>申请理由 ：<span v-if='customer.applyReason'>{{customer.applyReason}}</span><span v-else>--</span> </label>
            </Col>
        </Row>
        <Row>
            <Col span='8'>
                <label>审核人 ：<span v-if='customer.auditUserName'>{{customer.auditUserName}}</span><span v-else>--</span></label>
            </Col> 
            <Col span='8'>
                <label>审核日期 ：<span v-if='customer.auditTime'>{{customer.auditTime}}</span><span v-else>--</span> </label>
            </Col> 
            <Col span='24'>
                <label>审核内容 ：<span v-if='customer.auditContent'> {{customer.auditContent}}</span><span v-else>--</span></label>
            </Col>
            <Col span='24'>
                <label>附件：
                    <img v-if='customer.isImg == 1' :src="customer.attachmentUrl" style="width:200px;height : auto;" @click='showImg'>
                    <a v-else style="color:#09f;" :href="customer.attachmentUrl" title='点击下载'>{{customer.attachmentName}}</a>
                </label>
            </Col>
            <Col span='16' style='text-align:center;margin-top:20px;'>
               <Button type="warning" @click.native='back'>返回</Button>
            </Col>
        </Row>

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
           visible : false
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
    label {
        font-size: 18px;
        margin-top: 20px;
        display: block;
        color: #333;
    }
    label.state {
        font-size: 19px;
        font-weight: 900;
    }
</style>