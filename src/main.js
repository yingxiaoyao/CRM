// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css' 
import './my-theme/index.less'
import axios from 'axios'
import vuex from 'vuex'
import store from './vuex/store'
import action from './api/action'



Vue.use(iView);
Vue.prototype.$ajax = axios;
// Vue.prototype.$action = action;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
