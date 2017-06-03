import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './vuex/store'
import router from './router'

// axios 配置
axios.defaults.timeout = 2000;
axios.defaults.baseURL = 'http://lookat.soonergz.com:8888/easycrm';
// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers = {"Access-Control-Allow-Headers":"token_id, X-Requested-With, Content-Type"};
// axios.defaults.headers = {"Access-Control-Allow-Headers":"Content-Type"};
// axios.defaults.headers['Content-Type'] = `application/x-www-form-urlencoded`;


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers['token_id'] = store.state.token
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });


// http response 拦截器 
axios.interceptors.response.use(
    response => {
        if(response.data.status == 9) {
            window.location = 'http://lookat.soonergz.com:8888/crm/index.html';
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    });

export default axios;