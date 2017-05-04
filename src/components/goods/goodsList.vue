<template>
   <div class="goodsList">
       <Breadcrumb>
            <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>商品列表</Breadcrumb-item>
        </Breadcrumb>
        <Row class="fileHandle">
            <Col span='7'>
                <span>类别：</span><Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span='7'>
                <span>状态：</span><Select v-model="model1" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span='10'>
                <span>关键字：</span>
                <Input v-model="keywords" placeholder="商品名称/编码" style="width: 200px"></Input>
                <Button>查询</Button>
            </Col>
        </Row>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <router-link to='/goodsList/add'>
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
            <div class="buttonM">
                <a href="###" type="text">商品导入帮助</a>
            </div>
        </Row>

        <div class="fileHandle">
            <Table :columns="columns5" :data="data5"></Table>
        </div>
        <Row class="fileHandle" type="flex" justify="end">
            <Page :total="10" show-elevator></Page>
        </Row>
        <div class="fileHandle"></div>
        
   </div>
</template>

<script>
    import api from '@/api/api'
export default {
    mounted () {
        const _this = this;
        const goods = [];
        _this.axios(api.product + api.productByRequset)
            .then(function(res){
                console.log(res);
                const data = res.data.datas;
                data.forEach(function(item , index){
                    goods.push({
                        name : {
                            img : item.imageUrl,
                            name : item.name , 
                            code : item.barCode
                        },
                        prize : item.price,
                        unit : item.unitId,
                        status : item.status == 0 ? '已下架' : '上架中',
                        classify : item.catalogId
                    })
                })
                _this.data5 = goods;

            })
            .catch(function(err) {
                console.log(err);
            })




    },
    data () {
        return {
            cityList: [
                {
                    value: 'beijing',
                    label: '北京市'
                },
                {
                    value: 'shanghai',
                    label: '上海市'
                },
                {
                    value: 'shenzhen',
                    label: '深圳市'
                },
                {
                    value: 'hangzhou',
                    label: '杭州市'
                },
                {
                    value: 'nanjing',
                    label: '南京市'
                },
                {
                    value: 'chongqing',
                    label: '重庆市'
                }
            ],
            model1: '',
            keywords : '',
            columns5 : [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '商品名称',
                    key: 'name',
                    width : 350,
                    render (row , column , index) {
                        return  `<div class="wares">
                                    <img src='${row.name.img}'>
                                    <div class="waresInfo">
                                        <h3>${row.name.name}</h3> 
                                        <span>${row.name.code}</span>
                                    </div>
                                </div>`
                    }
                },
                {
                    title: '所属分类',
                    key: 'classify'
                },
                {
                    title: '销售价格',
                    key: 'prize',
                    sortable: true,
                    render (row, column, index) {
                        return `<span class='prize'>${row.prize}</span>`;
                    }
                },
                {
                    title: '单位',
                    key: 'unit',
                },
                {
                    title : '状态',
                    key : 'status'
                },
                {
                    title : '操作',
                    key: 'action',
                    align: 'center',
                    render (row, column, index) {
                        return `<i-button type="text" size="small" @click="show(${index})">修改</i-button> <i-button type="text" size="small" @click="remove(${index})">删除</i-button>`;
                    }
                }
            ],
            data5 : [
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '计算机',code : '123456'},
                    prize: 1800,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '电子'
                },
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '计算机',code : '123456'},
                    prize: 2500,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '计算机'
                },
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '电子',code : '123456'},
                    prize: 3000,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '电子'
                },
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '计算机',code : '123456'},
                    prize: 2600,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '服装'
                },
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '计算机',code : '123456'},
                    prize: 2600,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '服装'
                },
                {
                    name: {img : '/static/img/pic-login-bg.png' , name : '计算机',code : '123456'},
                    prize: 2600,
                    unit: '个',
                    status : {up : 0, down : 1},
                    classify: '服装'
                },

            ]

        }
    },
}
</script>

<style>
.ivu-select .ivu-select-dropdown {
    overflow: inherit;
}
.control {
    margin-top: 20px;
}
.fileHandle {
    margin-top: 20px;
}
.buttonM {
    margin-right: 10px;
}
.ivu-table-cell .ivu-table-sort i:first-child {
    top: -1px;
}
.prize {
    color: red;
}
.prize:before {
    content : '￥';
}
.wares {
    display: flex;
    padding: 10px 0;
}
.wares  img {
    width : 80px;
    height: 80px;
}
.wares .waresInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
}
.wares .waresInfo h3 {
    font-weight: 500;
    margin: 10px 0;
}
</style>