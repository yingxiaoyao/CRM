<template>
   <div class="goodsAttr">
       <Breadcrumb>
            <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>商品属性</Breadcrumb-item>
        </Breadcrumb>

         <Row class="fileHandle">
             <Col span='8'>
                <span>关键字：</span>
                <Input placeholder="商品名称/编码" style="width: 230px" v-model='name'></Input>
                     
                <Button type="warning"  >查询</Button>
             
             </Col>
         </Row>
         <Row type="flex" justify="end" class="fileHandle">
             <div class="buttonM">
                 <router-link to='/productAttribute/add'>
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
                 <Button type="info">商品属性模板下载</Button>
             </div>
         </Row>
         <div class="fileHandle">
            <Table :columns="tableHeader" :data="attrList"></Table>
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
            url :api.productAttr + api.productGetAll,
            data : api.jsonData(this.data)
        })
            .then(function(res){
                console.log(res);
                _this.totalCount = res.data.datas.total;
                _this.attrList = res.data.datas.rows;
            })
            .catch(function(err){
                console.log(err);
            })

    },
    data () {
        return {
            DOM : {},
            tableHeader : [
                    {
                        title: '属性名称',
                        key: 'name'
                    },
                    {
                        title: '属性值',
                        key: 'valueNames'
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
            attrList : [],
            name : '',
            totalCount: 30,
        }
    },
    computed : {
        data :function(){
            
            return {
                name : this.name,
                pageStart : this.$store.state.goodsAttrPage,
                pageNums : this.$store.state.pageNums
            };

        }
    },
    methods : {
        toPage (count) {
            const _this = this;
            _this.$store.commit('goodsAttrPage',count);
            _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url : api.productAttr + api.productGetAll,
                    data : api.jsonData(this.data)
                })
                .then(function(res) {
                    const data = res.data.datas;
                    _this.totalCount = data.total;

                    _this.attrList = data.rows;
                    _this.DOM.content.scrollTop = 0;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        modify (index,data) {
            this.$router.push({name :"addGoodsAttr",params : {id : data.id}});
        },
        remove (index,data) {
            const _this = this;

            this.$Modal.confirm({
                title: '确认框',
                content: '<p>确定要删除商品属性吗</p>',
                onOk: () => {
                    _this.axios(api.productAttr + index + api.delete)
                        .then(function(res){
                            console.log(res);
                            if(res.data.status == 1) {
                                _this.data.splicd(index , 1);
                            }else {
                                _this.$Message.error(res.data.message);
                            }
                        })
                        .catch(function(err){
                            console.log(err);
                        })
                }
            });


            
        }
       
    }
}
</script>

<style scoped>
.table {
    display: table;
    width: 100%;
    margin: 10px;
}
.child-table {
    display: table;
    width: 200%;
}
.table-header {
    display: table-header-group;
    background : #f5f7f9;
    border: 1px solid #ddd;
    /*color: #fff;*/
}
.table-tbody {
    display: table-row-group;
}
.table-tr {
    display: table-row;
    background: #fff;
}
.table-tr:hover {
    background: #f9f9f9;
}
.table-td {
    display: table-cell;
    height: 30px;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
</style>