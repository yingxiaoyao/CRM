<template>
    <div class="customer">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户列表</Breadcrumb-item>
        </Breadcrumb>
        <Row class="fileHandle">
            <Col span='8'>
               <span>客户名称：</span>
               <Input placeholder="商品名称/编码" style="width: 230px" v-model='name'></Input>
                    
               <Button type="warning"  @click='query'>查询</Button>
            
            </Col>
        </Row>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <router-link to='/addCustomer'>
                   <Button type="warning">新增</Button>
               </router-link>
            </div>
            <div class="buttonM">
                <Button type="info">导入</Button>
            </div>
            <div class="buttonM">
                <Button type="info">导出</Button>
            </div>
            <div class="buttonM">
                <Button type="info">模板下载</Button>
            </div>
        </Row>

        <div class='fileHandle'>
            <Table :columns="tableModle" :data="customerList"></Table>
        </div>
        <Row class="fileHandle" type="flex" justify="end">
           <Page :total="total" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
       </Row>
       <div class="fileHandle"></div>
                     

      
    </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name :'customer',
    mounted () {
        const _this = this;
        this.DOM = {
            content : document.getElementById('content'),
        };
        _this.axios({
            method : 'post',
            url :api.customer + api.queryAllPost,
            data : api.jsonData(this.data)
        })
            .then(function(res){
                console.log(res);
                _this.total = res.data.datas.total;
                _this.customerList = res.data.datas.rows;
            })
            .catch(function(err){
                console.log(err);
            })

        
    },
    data () {
        return {
            DOM : {},
            name : '',
            tableModle : [
                {
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    key: 'customerCorpName'
                },
                {
                    title: '申请人',
                    key: 'applyUserName'
                },
                {
                    title: '申请日期',
                    key: 'applyTime'
                },
                {
                    title: '审核人',
                    key: 'auditUserName'
                },
                {
                    title: '审核日期',
                    key: 'auditTime'
                },
                {
                    title: '审核状态',
                    key: 'applyStatusDispName'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                        if(row.applyStatus == 1){
                            return `<i-button type="text" size="small" @click="audit(row)">审核</i-button>`;
                        }
                        return `<i-button type="text" size="small" @click="show(row)">查看</i-button>`
                    }
                }

            ],
           customerList : [],
           name : '',
           total: 30,
        }
    },
    computed : {
        data :function(){
            return {
                name : this.name,
                pageStart : this.$store.state.page.auditCustomer,
                pageNums : this.$store.state.pageNums,
            };

        }
    },
    methods: {
        toPage (count) {
            const _this = this;
            _this.$store.commit('auditCustomer',count);

            _this.axios({
                method : 'post',
                url :api.customer + api.queryAllPost,
                data : api.jsonData(this.data)
            })
                .then(function(res){
                    console.log(res);
                    _this.total = res.data.datas.total;
                    _this.customerList = res.data.datas.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        query () {
            const _this = this;
            _this.$store.commit('auditCustomer',1);
            if(!this.data.name) {
                this.$Message.warning('请输入查询条件');
                return;
            }

            _this.axios({
                method : 'post',
                url :api.customer + api.queryAllPost,
                data : api.jsonData(this.data)
            })
                .then(function(res){
                    // console.log(res);
                    _this.total = res.data.datas.total;
                    _this.customerList = res.data.datas.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        audit (data) {
            // console.log(data);
            this.$router.push({path : '/audit/' + data.id})
        },
        show(data){
            // console.log(data);
            this.$router.push('/showCustomer/' + data.id);
        }
    }
}
</script>

<style scoped>
    
</style>