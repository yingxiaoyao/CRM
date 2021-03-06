import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/usermodule'
import pageModule from './modules/page'


Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义模块
	modules : {
		user : UserModule,
		page : pageModule
	},
  // 定义状态
  	state: {
  		token: null,
        title: '',
        pageNums : 10,		//分页条数
        goodsListPage : 1,	//商品列表 页码
        goodsAttrPage : 1,	// 商品属性 页码
  	},
 	// actions : api,
	mutations : {
		login : (state, data) => {
		    localStorage.token = data;
		    state.token = data;
		},
		logout : (state) => {
		    localStorage.removeItem('token');
		    localStorage.removeItem('corp');
		    localStorage.removeItem('user');
		    state.token = null;
		    state.user.user = {};
		    state.user.corp = {};
		},
		title : (state, data) => {
		    state.title = data;
		},
		goodsListPage : (state, page ) => {
			state.goodsListPage = page;
		},
		goodsAttrPage : (state , page ) => {
			state.goodsAttrPage = page;
		}
	}
})

export default store