// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' 
import './my-theme/index.less'
import axios from './http'
// import axios from 'axios'
import VueAxios from 'vue-axios'
import vuex from 'vuex'
import store from './vuex/store'
import editor from 'wangeditor'
import 'wangeditor/dist/js/wangEditor.js'


// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios);
Vue.use(editor);

Vue.use(iView);


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
