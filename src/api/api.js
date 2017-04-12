
export default {
	login : '/verifyUser.do',
	menus : '/sys/menu/fetchUserMenus.do',
	categoryGetRoots : '/api/customer/category/getRoots.do' , //查询客户分类列表
	categoryGetById : '/api/customer/category/:id/get.do', // 根据ID查询某一个客户分类详情
	categoryPostAddRoot :'/api/customer/category/addRoot.do' ,  //增加跟节点 post请求
	cetegoryAdd : '/api/customer/category/add.do', //增加节点 post请求 ，其中必须指定 parentId
	cetegoryModify : '/api/customer/category/modify.do', //修改指定节点
	cetegoryDelete : '/api/customer/category/{id}/delete.do',  //删除指定节点
	cetegoryMoveUp : '/api/customer/category/2/moveUp.do', //将特定节点上移，其中2位ID
	cetegoryMoveDown : '/api/customer/category/2/moveDown.do', //将特定节点下移，其中2位ID
}
