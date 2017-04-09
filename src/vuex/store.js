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
  		// host : 'http://localhost:3000'
  		// host : 'http://192.168.1.103:8080/easycrm'
  		host : 'http://lookat.soonergz.com:8888/easycrm'
  	},
 	// actions : api,
	mutations : {
		newAuthor (state , msg) {
	  		state.author = msg;
		}
	}
})

export default store