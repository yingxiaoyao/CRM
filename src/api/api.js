
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
	categoryGetRoots : 'getRoots.do' , //查询客户分类列表
	categoryGetById : '/:id/get.do', // 根据ID查询某一个客户分类详情
	categoryPostAddRoot :'addRoot.do' ,  //增加跟节点 post请求
	cetegoryAdd : 'add.do', //增加节点 post请求 ，其中必须指定 parentId
	cetegoryModify : 'modify.do', //修改指定节点
	cetegoryDelete : '/delete.do',  //删除指定节点 -- 之前添加删除ID  如 /12/delete.do
	cetegoryMoveUp : '/2/moveUp.do', //将特定节点上移，其中2位ID
	cetegoryMoveDown : '/2/moveDown.do', //将特定节点下移，其中2位ID
}
