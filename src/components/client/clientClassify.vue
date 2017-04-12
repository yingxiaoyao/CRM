<template>
    <div class="clientClassify">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>客户分类</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <Button type="warning">新增一级分类</Button>
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
        <div class="fileHandle">
            <div class="table">
                <div class="table-header">
                    <div class="table-td align_left">客户分类</div>
                    <div class="table-td">操作</div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='classify in data'>
                        <tree-table :model='classify' v-on:del='del'></tree-table>
                    </div>
                </div>
            </div>
        </div>
                     

        <Modal
            v-model="clientClassifyModel"
            title="新增分类">

            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <div class="prevClassName">
                    <div class="title">上级分类</div>
                    <div class="prevName">无</div>
                </div>
                <Form-item label="分类编码" prop="code">
                    <Input v-model="formValidate.name" placeholder="分类编码"></Input>
                </Form-item>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="分类名称"></Input>
                </Form-item>
                <Form-item label="EPR编码" prop="EPR">
                    <Input v-model="formValidate.name" placeholder="EPR编码"></Input>
                </Form-item>
                <Form-item label="描述" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from '@/api/api'
    import treeTable from '@/components/client/treeTable'
export default {
    components : {
        treeTable : treeTable
    },
    mounted () {
        const _this = this;
        this.axios(api.categoryGetRoots)
            .then(function(res) {
                // _this.data = res.data;
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            })
    },
    data () {
            return {
                data :[
                    {
                        name : 'abc',
                        level : 1,
                        child : [
                            {
                                name : 123,
                                level : 2,
                                child : [
                                    {
                                        name : 789,
                                        level : 3,
                                        child : [
                                            {
                                                name : 123456,
                                                level : 4
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name : 'bcd',
                        level : 1
                    }
                ],
                iconType : 'plus-round',
                clientClassifyModel : false,
                formValidate: {
                    name: '',
                    EPR: '',
                    code: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '分类编码不能为空', trigger: 'blur' }
                    ]
                },
                prevClass : null
            }
        },
        methods: {
            show (index) {
                this.clientClassifyModel = true;
            },
            handle (index,type) {
                var newValue1,
                 newValue2;
                if(type == 'prev') {
                    if(index == 0) {
                        return;
                    }
                    newValue1 = this.data1[index];
                    newValue2 = this.data1[index-1];
                    this.data1.splice(index-1,2,newValue1,newValue2);
                }else if (type == 'next') {
                    if(index == this.data1.length-1) {
                        return;
                    }
                    newValue1 = this.data1[index+1];
                    newValue2 = this.data1[index];
                    this.data1.splice(index,2,newValue1,newValue2);
                }else if (type == 'delete')　{
                    this.data1.splice(index,1);
                }

            },
            del () {
                this.$Message.info('你点击的了删除');
            }
        }
    }
</script>

<style scoped>
    .fileHandle {
        margin-top: 16px;
    }
    .buttonM {
        margin-right: 10px;
    }
    .buttonM:nth-last-child(1) {
        margin: 0;
    }
    .ivu-form-item {
        margin-bottom: 20px;
    }
    .prevClassName {
        display: flex;
        align-items: center;
    }
    .prevClassName .title {
        /*display: inline-block;*/
        width: 80px;
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 12px;
        color: #657180;
        line-height: 1;
        padding: 10px 12px 10px 0;
        box-sizing: content-box;
    }
    .prevName {
        /*float: none;*/
        display: inline-block;
        width: 100%;
    }

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
        width: 50%;
        vertical-align: middle;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    /*.table-td {
        width: 200%;
    }*/
    .align_left {
        text-align: left;
        padding-left: 30px;
    }
    .classityTeite {
        position: relative;
    }
    .isOpenicon {
        position: absolute;
        padding: 0 5px;
        font-size: 16px;
        left: -20px;
    }
</style>