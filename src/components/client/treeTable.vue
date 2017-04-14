<template>


<div class="child-table">
    <div class="table-tbody">
        <div class="table-tr">
            <div class="table-td align_left" :style="{paddingLeft : model.level * 30 + 'px'}">
                <div class="classityTeite"  @click="toggle">
                    <Icon :type="open ? 'minus-round' : 'plus-round'" class='isOpenicon' v-if='model.isChild'></Icon>
                    {{model.name}}
                </div>
            </div>
            <div class="table-td">
                <Button type="text" v-on:click='add'>添加子类</Button>
                <Button type="text" v-on:click='toEdit'>编辑</Button>
                <Button type="text" v-on:click='moveUp'>上移</Button>
                <Button type="text" v-on:click='moveDown'>下移</Button>
                <Button type="text" v-on:click.stop='isDel'>删除</Button>
            </div>
        </div>
        <div class="table-tr" v-if='model.isChild' v-show='open'>
        	<tree-table v-for="(item , index) in model.child" :model="item" :parentModel='model' :index='index' v-on:del='del' v-on:addChild='addChild' v-on:edit='edit' v-on:moveUp='moveUp' v-on:moveDown='moveDown'></tree-table>
        </div>


        <Modal v-model="delModel" width="360">
            <p slot="header" style="color:#f60;text-align:center;">
                <!-- <Icon type="information-circled"></Icon> -->
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
                <Form-item label="分类编码" prop="code">
                    <Input v-model="compileForm.code" placeholder="分类编码"></Input>
                </Form-item>
                <Form-item label="分类名称" prop="name">
                    <Input v-model="compileForm.name" placeholder="分类名称"></Input>
                </Form-item>
                <!-- <Form-item label="EPR编码" prop="EPR">
                    <Input v-model="compileForm.EPR" placeholder="EPR编码"></Input>
                </Form-item> -->
                <Form-item label="描述" prop="description">
                    <Input v-model="compileForm.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="分类描述"></Input>
                </Form-item>
            </Form>
        </Modal>
    </div>
</div>

</template>
 <script>
export default {
	name: 'treeTable',
	props: ['model','index', 'parentModel'],
 	data() {
	 	return {
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
                description : ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: '分类名称不能为空', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '分类编码不能为空', trigger: 'blur' }
                ]
            },
            parentName : '无',  //父级分类名称
            
		}
	},
	computed: {
		// this.routerName = this.$router.currentRoute.name;
	},
	methods: {
	 	toggle () {
			if (this.model.isChild) {
				this.open = !this.open
		 	}
		},
		add () {
			this.parentName = this.model.name;
			// this.compileForm.parentId = this.model.id;
			this.clientClassifyModel = true;
		},
		addChild () {
			// console.log(this.parentModel);
			if(this.$router.currentRoute.name == 'clientClassify') {

			}

		},
		toEdit () {
			this.clientClassifyModel = true;
			// this.parentName = this.model.name;
		},
		edit () {
			// this.$emit('edit',this.model);
		},
		moveUp (data) {
			if (data.name) {
				this.$emit('moveDown',data);
			}
			if(this.index == 0) {
			    return;
			}
			this.newValue1 = this.model;
			this.newValue2 = this.parentModel.child[this.index - 1];
			this.parentModel.child.splice(this.index-1,2,this.newValue1,this.newValue2);
			this.$emit('moveUp',this.model);
		},
		moveDown (data) {
			if (data.name) {
				this.$emit('moveDown',data);
			}
			if(this.index == this.parentModel.child.length - 1) {
			    return;
			}
			this.newValue1 = this.parentModel.child[this.index + 1];
			this.newValue2 = this.model;
			this.parentModel.child.splice(this.index,2,this.newValue1,this.newValue2);
			this.$emit('moveDown',this.model);
		},
		del (data) {
			if(data.name) {
				this.$emit('del',data);
			}
			this.parentModel.child.splice(this.index,1);
			this.delModel = false;
			this.$Message.success('删除成功');
			this.$emit('del',this.model);
		},
		isDel () {
			console.log(this.$router.currentRoute.name);
			this.delModel = true;
		},
		cancel () {
			this.delModel = false;
			this.clientClassifyModel = false;
		}
	}
}
</script>

<style>
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