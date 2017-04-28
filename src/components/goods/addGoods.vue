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
                                <Col span='24' v-for='(attrItem,index) in attrList' :key='index'>
                                    <label class="goodsAttr">{{attrItem.attrName}}</label>
                                    <Checkbox-group v-model='attrCheck[index]'>
                                        <Checkbox v-for='(item,index) in attrItem.attr' :key='index' :label="item"></Checkbox>
                                    </Checkbox-group>
                                </Col>
                            </Row>
                            <Icon type="android-add-circle" class='attrAdd'></Icon>
                        </Form-item>
                    </Col>
                    <Col span='24' class='span8' v-show='SKUstate'>
                         <Form-item label="商品SKU">
                             <div class="table">
                                <div class="table-header">
                                    <div class="table-td bold" v-for='(attr,index) in attrList' :key='index'>{{attr.attrName}}</div>
                                    <div class="table-td bold">SKU编码</div>
                                    <div class="table-td bold">ERP编码</div>
                                    <div class="table-td bold">销售价格</div>
                                    <div class="table-td bold">起订量</div>
                                    <div class="table-td bold">上下架</div>
                                    <div class="table-td bold">操作</div>
                                </div>
                                <div class="table-tbody">
                                    <div class="table-tr" v-for='(sku , index) in skus'>
                                        <div class="table-td" style='width : 50px;' v-for='attr in sku.attrText'>{{attr}}</div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].SKUCode" size="small" style='width:150px'></Input>
                                        </div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].ERPCode" size="small" style='width:150px'></Input>
                                        </div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].prize" size="small" style='width:150px'></Input>
                                        </div>
                                        <div class="table-td">
                                            <Input v-model="skus[index].count" size="small" style='width:150px'></Input>
                                        </div>
                                        <div class="table-td">
                                            <i-switch size="large" v-model='skus[index].isUp'>
                                                <span slot="open">上架</span>
                                                <span slot="close">下架</span>
                                            </i-switch>
                                            <a href="javascript" class="link">
                                                <Icon type="compose"></Icon>
                                                库存设置
                                            </a>
                                        </div>
                                        <div class="table-td">
                                            <Button type="text" @click='del'>删除</Button>
                                        </div>
                                    </div>
                                </div>
                             </div>
                         </Form-item>
                    </Col>
                    <Col span='24' class='span8'>
                        <Form-item label="商品描述">
                            <!-- <editor id="editor_id" height="500px" width="100%" :content="formItem.editorText"
                                    pluginsPath="/static/kindeditor/plugins/"
                                    :loadStyleMode="false"
                                    @on-content-change="onContentChange"></editor> -->


                            <quill-editor v-model="goodsDesc"
                                        ref="myQuillEditor"
                                        :options="editorOption"
                                        @blur="onEditorBlur($event)"
                                        @focus="onEditorFocus($event)"
                                        @ready="onEditorReady($event)">
                              </quill-editor>
                        </Form-item>
                    </Col>

                </Row>
           </Form>
           <div class="upload">
                <div class="imgUpload">
                    <label class="uploadLabel" style='width:120px;text-align:right;'>商品图册</label>
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
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
                        :on-error='handleError'
                        :format="['jpg','jpeg','png']"
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        :headers='uploadHeader'
                        multiple
                        type="drag"
                        :action="uploadUrl"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                        <img :src="imgUrl" v-if="visible" style="width: 100%">
                    </Modal>
                </div>
           </div>
        </div>



   </div>
</template>
<script>
import api from '@/api/api'
export default {
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
            // file : '',
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
            uploadUrl : 'http://lookat.soonergz.com:8888/easycrm/api/common/fileUpload.do',
            defaultList: [
                {
                    name : 'wallpaper_iphone7p_fortune-flows_large',
                    url : 'http://lookat.soonergz.com:8888/res//9b0a25b3afb442e7a7ca72209922b793.jpg'
                }
            ],
            imgUrl: '',
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
        }
    },
    mounted () {
        this.uploadList = this.$refs.upload.fileList;
        // console.log(this.uploadList);

        window.doExchange = function(doubleArrays) {
            var len = doubleArrays.length;
               if (len >= 2) {
                   var len1 = doubleArrays[0].length;
                   var len2 = doubleArrays[1].length;
                   var newlen = len1 * len2;
                   var temp = new Array(newlen);
                   var index = 0;
                   for (var i = 0; i < len1; i++) {
                       for (var j = 0; j < len2; j++) {
                           temp[index] = doubleArrays[0][i] + '--' + doubleArrays[1][j];
                           index++;
                       }
                   }
                   var newArray = new Array(len - 1);
                   for (var i = 2; i < len; i++) {
                       newArray[i - 1] = doubleArrays[i];
                   }
                   newArray[0] = temp;
                   
                   return window.doExchange(newArray);
               }
               else {
                   return doubleArrays[0];
               }
        }
    },
    computed : {
        skus : function() {
            if(this.attrCheck.length == this.attrList.length) {
                const result = [];
                const checkds = window.doExchange(this.attrCheck);
                checkds.forEach(function(item,index){
                    // console.log(item);
                    var itemArr = item.split('--');
                    result.push({
                        attrText : itemArr,
                        SKUCode : '',
                        ERPCode : '',
                        prize : '',
                        count : '',
                        isUp : true,
                    })
                })
                return result;
            }

        },
        SKUstate : function() {
            if(this.skus) {
                return this.skus.length >= 1;
            }
        },
        uploadHeader : function() {
            const tokenId = this.$store.state.token;
            return {
                token_id : tokenId
            }
        }
    },
    methods: {
       handleView (item) {
           this.imgUrl = item.url;
           this.visible = true;
       },
       handleRemove (file) {
           // 从 upload 实例删除数据
           const fileList = this.$refs.upload.fileList;
           this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
       },
       handleError (err,file,fileList) {
            this.$Notice.warning(err);
       },
       handleSuccess (res, file,fileList) {
           file.url = res.url;
           file.name = res.fileName;
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
        },
        del () {
            
            console.log(this.skus);
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
    width: auto;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid #ddd;
}
.bold {
    font-weight: 900;
}
.upload {
    padding-left : 20px;
}
.uploadLabel {
    width: 120px;
    display: inline-block;
    padding: 10px 12px 10px 0;
    vertical-align: top;
}
</style>
