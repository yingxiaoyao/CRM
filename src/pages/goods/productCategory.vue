<template>
    <div class="prodectCategory">
        <Breadcrumb>
            <Breadcrumb-item>首页</Breadcrumb-item>
            <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>商品分类</Breadcrumb-item>
        </Breadcrumb>
        <Row type="flex" justify="end" class="fileHandle">
            <div class="buttonM">
                <Button type="warning" @click='addRoot'>新增一级分类</Button>
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
                    <div class="table-td align_left" style="width:40%">客户分类</div>
                    <div class="table-td" style='width:30%'>编码</div>
                    <div class="table-td" style="width : 30%">操作</div>
                </div>
            </div>
        </div>
        <div>
            <treeTableProduct  v-for='(classify , index) in data ' :key='index' :model='classify' :parentModel='data'  :index='index' @moveUp='moveUp'></treeTableProduct>
        </div>
                     

        <Modal
            v-model="clientClassifyModel"
            title="新增分类"
            @on-ok="confirm"
            @on-cancel="cancel">

            <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
                <div class="prevClassName">
                    <div class="title">上级分类</div>
                    <div class="prevName">{{ parentName }}</div>
                </div>
                <Form-item label="分类编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="分类编码"></Input>
                </Form-item>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="分类名称"></Input>
                </Form-item>
                <Form-item label="图片" prop="imageUrl">
                    <Upload :action="uploadUrl" class='inline-block' :on-success="mainImgSuccess" :headers='uploadHeader' :show-upload-list="false" :before-upload="handleBeforeUpload">
                        <div class="addMainImg" v-if='!isUpload'>
                            <Icon type="plus-round" size='20' v-if='!compileForm.imageUrl'></Icon>
                            <img :src="compileForm.imageUrl" class="mainImg" v-else>
                        </div>
                        <div v-else>
                            <Spin fix>上传中...</Spin>
                        </div>
                    </Upload>
                </Form-item>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import api from '@/api/api'
    import treeTableProduct from '@/components/goods/treeTable_product'
export default {
    name : 'prodectCategory',
    components : {
        treeTableProduct : treeTableProduct
    },
    mounted () {
        const _this = this;
        // this.axios(api.category + api.categoryGetRoots)

        this.axios(api.qroductCatalog + api.queryAll)
            .then(function(res) {
                _this.data = res.data.datas;
                console.log(res);
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
                    imageUrl : ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '分类编码不能为空', trigger: 'blur' }
                    ]
                },
                isUpload : false,
                uploadUrl : 'http://lookat.soonergz.com:8888/easycrm/api/common/fileUpload.do',
                uploadData : {path : 'product'},
                defaultList: [],
                imgUrl: '',
                parentName : '无',
                prevClass : null ,
                 
            }
        },
        computed : {
            uploadHeader : function() {
                const tokenId = this.$store.state.token;
                return {
                    token_id : tokenId
                }
            }
        },
        methods: {
            show (index) {
                this.clientClassifyModel = true;
            },
            handleBeforeUpload () {
                this.isUpload = true;
            },
            mainImgSuccess (res,file,fileList) {
                this.isUpload = false;
                this.compileForm.imageUrl = res.url;
            },
            confirm () {
                const _this = this;
                _this.axios({
                    method : 'post',
                    header : {
                        "Content-Type" : 'application/x-www-form-urlencoded'
                    },
                    url :api.qroductCatalog + api.addRoot,
                    data : api.jsonData(_this.compileForm)
                })
                .then(function(res) {
                    console.log(res);
                    if(res.data.status == 1) {
                        _this.data.push(res.data.datas);
                        _this.compileForm.name = '';
                        _this.compileForm.parentId = '';
                        _this.compileForm.code = '';
                        _this.compileForm.imageUrl = '';
                        _this.$Message.success('添加成功');
                    }
                })
            },
            addRoot () {
                this.parentName = '无';
                this.clientClassifyModel = true;
                console.log(this.data);
            },
            moveUp (data) {
            },
            cancel () {
                // this.delModel = false;
                this.clientClassifyModel = false;
                this.compileForm.name = '';
                this.compileForm.parentId = '';
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
        display: inline-block;
        width: 100%;
    }

    .table {
        display: table;
        width: 100%;
        margin: 0;
    }
    .table-header {
        display: table-header-group;
        background : #f5f7f9;
        border: 1px solid #ddd;
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
        width: auto;
        vertical-align: middle;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
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

    .addMainImg {
        width: 80px;
        height: 80px;
        line-height: 80px;
        border: 1px dashed #d7dde4;
        display: inline-block;
        cursor: pointer;
        background: #fff;
        text-align: center;
        border-radius: 3px;
        transition: border 0.2s ease;
    }
    .addMainImg:hover {
         border: 1px dashed #09f;
    }
    .addMainImg img {
        width: 100%;
        height: 100%;
    }
</style>