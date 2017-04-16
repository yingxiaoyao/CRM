
export default {
	jsonData : function(data){
		// console.log(data);
		var jsondata = '';
		for(const key in data) {
			if(data[key]) {
				// var json = ;
				jsondata += key + '=' + data[key] + '&';
			}
		}
		const json = jsondata.substr(0,jsondata.length-1);
		return json;
	},
	login : '/verifyUser.do',
	menus : '/sys/menu/fetchUserMenus.do',
	category : '/api/customer/category/', //客户分类 api 根路径
	categoryGetRoots : 'queryAll.do' , //查询客户分类列表
	categoryGetById : '/query.do', // 根据ID查询某一个客户分类详情 -- 之前添加查询ID 如 /12/query.do
	categoryPostAddRoot :'addRoot.do' ,  //增加跟节点 post请求
	cetegoryAdd : 'add.do', //增加子节点 post请求 ，其中必须指定 parentId
	cetegoryModify : 'modify.do', //修改指定节点
	cetegoryDelete : '/delete.do',  //删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	cetegoryMoveUp : '/moveUp.do', //将特定节点上移-- 之前添加上移ID  如 /12/moveUp.do
	cetegoryMoveDown : '/moveDown.do', //将特定节点下移-- 之前添加上移ID  如 /12/moveDown.do
}
