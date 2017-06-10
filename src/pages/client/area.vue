<template>
    <div class="area">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>客户管理</Breadcrumb-item>
            <Breadcrumb-item>区域设置</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <Button type="warning" @click='addRoot'>新增一级区域分类</Button>
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
                    <div class="table-td align_left">区域名称</div>
                    <div class="table-td">操作</div>
                </div>
                <div class="table-tbody">
                    <div class="table-tr" v-for='(classify , index) in data'>
                        <tree-table :model='classify' :parentModel='data'  :index='index' @moveUp='moveUp'></tree-table>
                    </div>
                </div>
            </div>
        </div>
                     

        <Modal
            v-model="clientClassifyModel"
            title="新增区域">

            <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
                <div class="prevClassName">
                    <div class="title">上级区域</div>
                    <div class="prevName">{{ parentName }}</div>
                </div>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="区域名称"></Input>
                </Form-item>
                <Form-item label="分类编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="区域编码"></Input>
                </Form-item>
                <Form-item label="描述" prop="description">
                    <Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
                </Form-item>
            </Form>
            <div class="modelFooter" slot='footer'>
                <Button type="text" @click='cancel'>取消</Button>
                <Button type="info" @click="confirm('compileForm')">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import api from '@/api/api'
    import treeTable from '@/components/client/treeTable_area'
export default {
    components : {
        treeTable : treeTable
    },
    mounted () {
        const _this = this;
        this.axios(api.region + api.regionGetRoot)
            .then(function(res) {
                _this.data = res.data.datas;
            })
            .catch(function(err) {
                console.log(err);
            })
    },
    data () {
            return {
                data : '',
                clientClassifyModel : false,
                compileForm: {
                    parentId : '',
                    name: '',
                    code: '',
                    description : ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' },
                        { type: 'string', max: 100, message: '分类编码不能超过100个字符'}
                    ],
                    code: [
                        { required: true, message: '分类编码不能为空', trigger: 'blur' },
                        { type: 'string', max: 30, message: '分类编码不能超过30个字符'}
                    ],
                    description : [
                        { required: true, message: '分类描述不能为空', trigger: 'blur' },
                        { type: 'string', max: 500, message: '分类编码不能超过500个字符'}
                    ]
                },
                parentName : '无',
                prevClass : null ,
                 
            }
        },
        methods: {
            show (index) {
                this.clientClassifyModel = true;
            },
            confirm (name) { 
                const _this = this;

                this.$refs[name].validate((valid) => {
                    if(valid) {
                        _this.axios({
                            method : 'post',
                            header : {
                                "Content-Type" : 'application/x-www-form-urlencoded'
                            },
                            url :api.region + api.regionAddRoot,
                            // url : '/prize',
                            data : api.jsonData(_this.compileForm)
                        })
                        .then(function(res) {
                            console.log(res);
                            if(res.data.status == 1) {
                                _this.data.push(res.data.datas);
                                _this.clientClassifyModel = false;
                                _this.compileForm.name = '';
                                _this.compileForm.parentId = '';
                                _this.compileForm.code = '';
                                _this.compileForm.description = '';
                                _this.$Message.success('添加成功');
                            }
                        })
                    }
                })
               
            },
            addRoot () {
                // this.enterType = 1;
                this.parentName = '无';
                this.clientClassifyModel = true;
                console.log(this.data);
            },
            moveUp (data) {
                // console.log(data);
            },
            cancel () {
                // this.delModel = false;
                this.clientClassifyModel = false;
                this.compileForm.name = '';
                this.compileForm.parentId = '';
                // this.compileForm.EPR = '';
                this.compileForm.code = '';
                this.compileForm.description = '';
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