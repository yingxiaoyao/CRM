<template>
   <div class="addGoods">
        <Breadcrumb>
             <Breadcrumb-item>商品信息</Breadcrumb-item>
            <Breadcrumb-item>
                <router-link to='/goodsList'>
                    商品列表
                </router-link>
            </Breadcrumb-item>
             <Breadcrumb-item>商品新增</Breadcrumb-item>
         </Breadcrumb>
         <div class="fileHandle">
           <Form :model="formItem" :rules="goodsRule" :label-width="120">
                <Row>
                    <Col span="8" class='span8'>
                        <Form-item label="商品编码" prop="code">
                            <Input type="text" v-model="formItem.code" placeholder="必填"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="商品名称" prop='name'>
                            <Input type="text" v-model="formItem.name" placeholder="最多输入100个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="商品条形码" prop='barCode'>
                            <Input type="text" v-model="formItem.barCode"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="卖点" prop='sellingPoint'>
                            <Input type="text" v-model="formItem.sellingPoint" placeholder="最多输入100个字符"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="商品分类" prop='goodsClassify'>
                            <Select v-model="formItem.goodsClassify" placeholder="请选择">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="辅助商品分类" prop='assistClassify'>
                            <Select v-model="formItem.assistClassify" placeholder="请选择">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="主计量单位" prop='unit'>
                            <Select v-model="formItem.unit" placeholder="请选择">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="销售价格" prop='prize'>
                            <Input type="text" v-model="formItem.prize"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="起订量" prop='quantify'>
                            <Input type="text" v-model="formItem.quantify"></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" class='span8'>
                        <Form-item label="排序号" prop='sort'>
                            <Input type="text" v-model="formItem.sort"></Input>
                        </Form-item>
                    </Col>
                    <Col span="24" class='span8'>
                        <Form-item label="是否是推荐商品" prop='isRecommend'>
                            <i-switch v-model='formItem.isRecommend'>
                                <Icon type="android-done" slot="open"></Icon>
                                <Icon type="android-close" slot="close"></Icon>
                            </i-switch>
                        </Form-item>
                    </Col>
                    <Col span="24" class='span8'>
                        <Form-item label="库存设置">
                            <a href="javascript" class="link">
                                <Icon type="compose"></Icon>
                                库存设置
                            </a>
                        </Form-item>
                    </Col>
                    <Col span="24" class='span8'>
                        <Form-item label="商品属性">
                            <Row>
                                <Col span='24' v-for='(attrItem,index) in attrList'>
                                    <label class="goodsAttr">{{attrItem.attrName}}</label>
                                    <Checkbox-group v-model='attrCheck[index]'>
                                        <Checkbox v-for='item in attrItem.attr' :label="item"></Checkbox>
                                    </Checkbox-group>
                                </Col>
                            </Row>
                            <Icon type="android-add-circle" class='attrAdd'></Icon>
                        </Form-item>
                    </Col>
                    <Col span='24' class='span8'>
                         <Form-item label="商品SKU">
                             <Table :columns="skuTitle" :data="skuList"></Table>
                         </Form-item>
                    </Col>
                    <Col span='24' class='span8'>
                        <Form-item label="商品描述aaa">
                            <!-- <editor id="editor_id" height="500px" width="100%" :content="formItem.editorText"
                                    pluginsPath="/static/kindeditor/plugins/"
                                    :loadStyleMode="false"
                                    @on-content-change="onContentChange"></editor> -->


                            <!--<quill-editor v-model="goodsDesc"-->
                                        <!--ref="myQuillEditor"-->
                                        <!--:options="editorOption"-->
                                        <!--@blur="onEditorBlur($event)"-->
                                        <!--@focus="onEditorFocus($event)"-->
                                        <!--@ready="onEditorReady($event)">-->
                              <!--</quill-editor>-->
                        </Form-item>
                    </Col>
                    <Col span='24' class='span8'>
                        <Form-item label="商品图册">

                            <div class="demo-upload-list" v-for="item in uploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                            <Modal title="查看图片" v-model="visible">
                                <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                            </Modal>
                        </Form-item>
                    </Col>
                    <Col span='24' class='span8'>
                        <Form-item label="添加附件">
                            <Upload
                                multiple
                                action="//jsonplaceholder.typicode.com/posts/">
                                <Button type="info" icon="ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </Form-item>
                    </Col>

                </Row>


           </Form>
         </div>




   </div>
</template>
<script>

export default {
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
    },
    data () {
        return {
            formItem: {
                code: '',
                name : '',
                barCode : '',
                sellingPoint : '',
                goodsClassify: '',
                assistClassify : '',
                unit : '',
                prize : '',
                quantify : '',
                sort : '',
                isRecommend : '',
            },
            goodsDesc: '<h2>I am Example</h2>',
            goodsRule : {
                code : [
                    {required: true, message: '商品编码不能为空'}
                ],
                name : [
                    {required : true,message : '商品名称不能为空'}
                ],
                goodsClassify : [
                    {required : true,message : '请选择商品分类'}
                ],
                unit : [
                    {required : true}
                ]
            },
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: [],
            editorOption : {

            },
            attrList : [
                {
                    attrName : '颜色',
                    attr : ['红色','黄色','蓝色']
                },
                {
                    attrName : '材料',
                    attr : ['布','棉']
                }
            ],
            attrCheck : [],
            skus: {
                SKUCode : '',
                prize : '',
                count : '',
                isUp : true,
            },
            skuTitle : [
                {
                    title : '颜色',
                    key : 'name',
                },
                {
                    title : 'SKU编码',
                    key : 'SKUCode',
                    render (row,column,index) {
                        return `<i-input size="small"></i-input>`
                    }
                },
                {
                    title : '销售价格',
                    key : 'prize',
                    render (row,column,index) {
                        return `<i-input  size="small"></i-input>`
                    }
                },
                {
                    title : '起订量',
                    key : 'count',
                    render (row,column,index) {
                        return `<i-input size="small"></i-input>`
                    }
                },
                {
                    title : '上下架',
                    render (row, column, index) {
                        return `<i-switch size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <a href="javascript:">
                                    <Icon type="compose"></Icon>
                                    库存设置
                                </a>`
                    }
                },
                {
                    title : '操作',
                    render (row,column,index) {
                        return `<i-button type="text">删除</i-button>`
                    }
                }
            ],
            skuList : [
                {
                    name : '红色'
                },
                {
                    name : '蓝色'
                }
            ]


        }
    },
    methods: {
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove (file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload () {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        },
        onEditorBlur(editor) {
                console.log('editor blur!', editor)
              },
              onEditorFocus(editor) {
                console.log('editor focus!', editor)
              },
              onEditorReady(editor) {
                console.log('editor ready!', editor)
              },
              onEditorChange({ editor, html, text }) {
                console.log('editor change!', editor, html, text)
                this.content = html
              }
    }
}
</script>

<style scoped>
.span8 {
    padding-left: 20px;
}
.link {
    color: #09f;
}
.link:hover {
    color : #283f82;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
.ivu-checkbox-group {
    display: inline-block;
    padding-left: 20px;
}
.attrAdd {
    font-size: 24px;
    cursor: pointer;
}
.attrAdd:hover {
    color: #09f;
}
</style>
