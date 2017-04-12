<template>


<div class="child-table">
    <div class="table-tbody">
        <div class="table-tr">
            <div class="table-td align_left" :style="{paddingLeft : model.level * 30 + 'px'}">
                <div class="classityTeite">
                    <Icon :type="open ? 'plus-round' : 'minus-round'" class='isOpenicon' v-if='isFolder'></Icon>
                    {{model.name}}
                </div>
            </div>
            <div class="table-td">
                <Button type="text" v-on:click='addChild'>添加子类</Button>
                <Button type="text" v-on:click='edit'>编辑</Button>
                <Button type="text" v-on:click='moveUp'>上移</Button>
                <Button type="text" v-on:click='moveDown'>下移</Button>
                <Button type="text" v-on:click='del'>删除</Button>
            </div>
        </div>
        <div class="table-tr" v-if='isFolder'>
        	<tree-table v-for="item in model.child" :model="item" v-on:del='del'></tree-table>
        </div>
    </div>
</div>





 <!-- <li>
	 <span @click="toggle">
		 <i v-if="isFolder" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
		 <i v-if="!isFolder" class="icon file-text"></i>
		 {{ model.menuName }}
	 </span>
	 <ul v-show="open" v-if="isFolder">
	 	<tree-table v-for="item in model.children" :model="item"></tree-table>
	 </ul>
 </li> -->
</template>
 <script>
export default {
	name: 'treeTable',
	props: ['model'],
 	data() {
	 	return {
			 open: false,
			 isFolder: this.model.child && this.model.child.length > 0,
		}
	},
	computed: {
		// isFolder: function() {
		// 	return this.model.child && this.model.child.length > 0;
		// }
	},
	methods: {
	 	toggle: function() {
			if (this.isFolder) {
				this.open = !this.open
		 	}
		},
		addChild () {
			this.$emit('addChild');
		},
		edit () {
			this.$emit('edit');
		},
		moveUp () {
			this.$emit('moveUp');
		},
		moveDown () {
			this.$emit('moveDown');
		},
		del () {
			this.$emit('del');
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
</style>