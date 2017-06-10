<template>

<div class="child-table">
    <!-- <div class="table-tbody"> -->
        <div class="table-tr">
            <div class="table-td align_left" :style="{paddingLeft : model.level * 30 + 'px',width : '40%'}">
                <div class="classityTeite"  @click="toggle">
                    <Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.children' style='line-height: 33px;'></Icon>
                    <img v-if='model.imageUrl' :src="model.imageUrl" alt="">{{model.name}}
                </div>
            </div>
            <div class="table-td" style="width:30%">
                {{model.code}}
            </div>
            <div class="table-td" style="width:30%;">
                <Button type="text" v-on:click='add'  v-if='model.level!==5'>添加子类</Button>
                <Button type="text" v-on:click='toEdit'>编辑</Button>
                <Button type="text" v-on:click='moveUp'>上移</Button>
                <Button type="text" v-on:click='moveDown'>下移</Button>
                <Button type="text" v-on:click='isDel'>删除</Button>
            </div>
        </div>
    <!-- </div> -->
        <Modal v-model="delModel" width="360">
            <p slot="header" style="color:#f60;text-align:center;">
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删除吗？</p>
            </div>
            <div slot="footer">
            	<Button type='text' @click='cancel'>取消</Button>
                <Button type="error" @click="del">删除</Button>
            </div>
        </Modal>

        <Modal
            v-model="clientClassifyModel"
            title="新增分类"
            @on-ok="addChild"
            @on-cancel="cancel">

            <Form ref="compileForm" :model="compileForm" :rules="ruleValidate" :label-width="80">
                <div class="prevClassName">
                    <div class="title">上级分类</div>
                    <div class="prevName">{{ parentName }}</div>
                </div>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="分类名称"></Input>
                </Form-item>
                <Form-item label="分类编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="分类编码"></Input>
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
            <div class="modelFooter" slot='footer'>
                <Button type="text" @click='cancel'>取消</Button>
                <Button type="info" @click="addChild('compileForm')">确定</Button>
            </div>
        </Modal>
        
        <div  v-if='model.children' v-show='open'>
        	<tree-table v-for="(item , index) in model.children" :key='index' :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
        </div>
</div>

</template>
 <script>
import api from '@/api/api'
export default {
	name: 'treeTable',
	props: ['model','index', 'parentModel'],
 	data() {
	 	return {
	 		data : this.model,
	 		open : false,
		 	// isFolder: this.model.child && this.model.child.length > 0,
		 	moveDownCount : 0,
		 	newValue1 : '',
		 	newValue2 : '',
		 	delModel : false,
		 	clientClassifyModel : false,
		 	compileForm: {
                parentId : '',
                name: '',
                // EPR: '',
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
            parentName : '无',  //父级分类名称
            isEdit : false
            
		}
	},
	computed: {
		uploadHeader : function() {
		    const tokenId = this.$store.state.token;
		    return {
		        token_id : tokenId
		    }
		}
	},
	methods: {
	 	toggle () {
			if (this.model.children) {
				this.open = !this.open
		 	}
		},
		handleBeforeUpload () {
		    this.isUpload = true;
		},
		mainImgSuccess (res,file,fileList) {
		    this.isUpload = false;
		    this.compileForm.imageUrl = res.url;
		},
		add () {
			this.parentName = this.model.name;
			this.compileForm.parentId = this.model.id;
			this.clientClassifyModel = true;
		},
		addChild (name) {
			const _this = this;
			 this.$refs[name].validate((valid) => {
			 	if(valid) {
			 		if(!this.isEdit){
			 			_this.axios({
			 			    method : 'post',
			 			    header : {
			 			        "Content-Type" : 'application/x-www-form-urlencoded'
			 			    },
			 			    url :api.qroductCatalog + api.add,
			 			    data : api.jsonData(_this.compileForm)
			 			})
			 			.then(function(res) {
			 			    console.log(res);
			 			    if(res.data.status == 1) {
			 			    	if(_this.model.children) {
			 			    		_this.model.children.push(res.data.datas);
			 			    	}else {
			 			    		_this.model.children = [res.data.datas];

			 			    	}
			 			    	_this.clientClassifyModel = false;
			 				    _this.compileForm.name = '';
			 				    _this.compileForm.parentId = '';
			 				    _this.compileForm.code = '';
			 				    _this.compileForm.imageUrl = '';
			 			    }
			 			})
			 		}else {
			 			const editInfo = _this.compileForm;
			 			editInfo.id = this.model.id;
			 			_this.axios({
			 			    method : 'post',
			 			    header : {
			 			        "Content-Type" : 'application/x-www-form-urlencoded'
			 			    },
			 			    url :api.qroductCatalog + api.modify,
			 			    data : api.jsonData(editInfo)
			 			})
			 			.then(function(res) {
			 			    console.log(res);
			 			    _this.model = res.data.datas;
			 			    _this.data = res.data.datas;
			 			    _this.clientClassifyModel = false;
			 			    _this.compileForm.name = '';
			 			    _this.compileForm.parentId = '';
			 			    _this.compileForm.code = '';
			 			    _this.compileForm.imageUrl = '';
			 			})
			 			this.isEdit = false;
			 		}
			 	}
			 })
			
		},
		toEdit () {

			const _this = this;

			_this.axios(api.qroductCatalog + _this.model.id + api.queryById)
				.then(function(res) {
					var data = res.data.datas;

					if(res.data.status == 1) {
						_this.clientClassifyModel = true;
						_this.compileForm.name = data.name;
						_this.compileForm.parentId = data.parentId;
						_this.compileForm.code = data.code;
						_this.compileForm.imageUrl = data.imageUrl;
						_this.isEdit = true;
					}
				})


		},
		edit () {
		// 	// this.$emit('edit',this.model);
		},
		moveUp (data) {
			if (data.id) {
				this.$emit('moveUp',data);
				return;
			}
			const _this = this;
			_this.axios(api.qroductCatalog + _this.model.id + api.moveUp)
				.then(function(res) {
					// console.log(res);
					if(res.data.status == 1) {

						if(_this.model.level !== 1) {
							// console.log(data);
							if(_this.index == 0) {
							    return;
							}
							// console.log(this.parentModel);
							_this.newValue1 = _this.model;
							_this.newValue2 = _this.parentModel.children[_this.index - 1];
							_this.parentModel.children.splice(_this.index-1,2,_this.newValue1,_this.newValue2);
							_this.$emit('moveUp',_this.model);
						} else {
							
							if(_this.index == 0) {
							    return;
							}
							_this.newValue1 = _this.model;
							_this.newValue2 = _this.parentModel[_this.index - 1];
							_this.parentModel.splice(_this.index-1,2,_this.newValue1,_this.newValue2);
						}
						_this.$Message.success('上移成功');
					}
				})


		},
		moveDown (data) {
			const _this = this;
			if (data.id) {
				_this.$emit('moveDown',data);
				return;
			}
			_this.axios(api.qroductCatalog + _this.model.id + api.moveDown)
				.then(function(res){
					if(res.data.status == 1) {
						if(_this.model.level !== 1) {
							
							if(_this.index == _this.parentModel.children.length - 1) {
							    return;
							}
							_this.newValue1 = _this.parentModel.children[_this.index + 1];
							_this.newValue2 = _this.model;
							_this.parentModel.children.splice(_this.index,2,_this.newValue1,_this.newValue2);
							_this.$emit('moveDown',_this.model);
						}else {
							
							if(_this.index == _this.parentModel.length - 1) {
							    return;
							}
							_this.newValue1 = _this.parentModel[_this.index + 1];
							_this.newValue2 = _this.model;
							_this.parentModel.splice(_this.index,2,_this.newValue1,_this.newValue2);
							// _this.$emit('moveDown',_this.model);
						}
						_this.$Message.success('下移成功');
					}else {
						_this.$Message.error(res.data.message);
					}
				})

		},
		del (data) {
			if(data.id) {
				this.$emit('del',data);
				return;
			}

			const _this = this;
			_this.axios(api.qroductCatalog + _this.model.id + api.delete)
				.then(function(res) {
					console.log(res);
					if(res.data.status == 1) {
						if(_this.model.level !== 1) {
							_this.parentModel.children.splice(_this.index,1);
							_this.delModel = false;
							_this.$Message.success('删除成功');
							_this.$emit('del',_this.model);
						}else {
							_this.parentModel.splice(_this.index,1);
							_this.delModel = false;
							_this.$Message.success('删除成功');
							_this.$emit('del',_this.model);
						}
					}else if(res.data.status == 0) {
						_this.delModel = false;
						_this.$Message.error(res.data.message);
					}
				})

		},
		isDel () {
			// console.log(this.$router.currentRoute.name);
			this.delModel = true;
		},
		cancel () {
			this.delModel = false;
			this.clientClassifyModel = false;
			this.compileForm.name = '';
			this.compileForm.parentId = '';
			// this.compileForm.EPR = '';
			this.compileForm.code = '';
			this.compileForm.imageUrl = '';
		}
	}
}
</script>

<style scoped>
	.child-table {
	    display: block;
	    width: 100%;
	}
	.table-tr {
		display: flex;
		justify-content: center;
	}
	.table-td {
	    display: block;
	    height: 35px;
	    width: auto;
	    vertical-align: middle;
	    text-align: center;
	    border-bottom: 1px solid #ddd;
	    line-height: 35px;
	}
	.align_left {
	    text-align: left;
	    padding-left: 30px;
	}
	.classityTeite {
	    position: relative;
	}
	.classityTeite img {
		width : 20px;
		height: auto;
		vertical-align: middle;
		margin-right: 5px;
	}
	.isOpenicon {
	    position: absolute;
	    padding: 0 5px;
	    font-size: 16px;
	    left: -20px;
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
	    display: inline-block;
	    width: 100%;
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