import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './modules/usermodule'


Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义模块
	modules : {
		user : UserModule
	},
  // 定义状态
  	state: {
  		token: null,
        title: ''
  	},
 	// actions : api,
	mutations : {
		login : (state, data) => {
		    localStorage.token = data;
		    state.token = data;
		},
		logout : (state) => {
		    localStorage.removeItem('token');
		    state.token = null
		},
		title : (state, data) => {
		    state.title = data;
		}
	}
})

export default store