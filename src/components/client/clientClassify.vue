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
            <Table :columns="columns1" width='100%' :data="data1" size='small'></Table>
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
export default {
    mounted () {
        // var kid = this.$route.params.id;
    },
    data () {
            return {
                columns1 : [
                    {
                        title : '客户分类',
                        align : 'center',
                        key : 'name'
                    },
                    {
                        title : '操作',
                        key : 'action',
                        align: 'center',
                        render (row, column, index) {
                            return `<i-button type="text" size="small" @click="show(${index})">新增子类</i-button> <i-button type="text" size="small">编辑</i-button> <i-button type='text' size='small' @click='handle(${index},"prev")'>上移</i-button> <i-button type='text' size='small' @click='handle(${index},"next")'>下移</i-button> <i-button type='text' size='small' @click="handle(${index},'delete')">删除</i-button>`;
                        }
                    }
                ],
                data1 : [
                    {
                        name : '办公类',
                        prevClass : null
                    },
                    {
                        name : '工具类'
                    },
                    {
                        name : '商品类'
                    }
                ],
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
</style>