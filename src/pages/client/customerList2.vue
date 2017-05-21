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
                      
                 <Button type="warning"  >查询</Button>
              
              </Col>
          </Row>
       <Row type="flex" justify="end" class="fileHandle">
                  <div class="buttonM">
                      <Button type="warning" @click=''>新增</Button>
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
             <Page :total="totalCount" :pageSize='10' show-elevator show-total @on-change='toPage'></Page>
         </Row>
        
        
   </div>
</template>

<script>
    import api from '@/api/api'
export default {
    name : 'goodsAttr',
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
                    key: 'applyName'
                },
                {
                    title: '审核日期',
                    key: 'time'
                },
                {
                    title: '审核状态',
                    key: 'applyStatus'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="text" size="small" @click="modify(${index},row)">编辑</i-button> <i-button type="text" size="small" @click="remove(${index},row)">删除</i-button>`;
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
               pageStart : this.$store.state.page.customerPage,
               pageNums : this.$store.state.pageNums,
           };

        }
    },
    methods : {
        toPage (count) {
            
        },
        modify (index,data) {
            console.log(index);
        },
        remove (index,data) {
            console.log(index);
        }
       
    }
}
</script>

<style scoped>

</style>