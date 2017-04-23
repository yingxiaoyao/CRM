import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Login from '@/components/login/login'
import Hello from '@/components/Hello'
import Index from '@/components/index'
import Welcome from '@/components/welcome/welcome'
import clientClassify from '@/components/client/clientClassify'
import clientRank from '@/components/client/clientRank'
import area from '@/components/client/area'
import trade from '@/components/client/trade'
import goodsList from '@/components/goods/goodsList'
import addGoods from '@/components/goods/addGoods'


Vue.use(Router)

const routes = [
    {
      path: '/',
      name :'/',
      meta: {
          requireAuth: true,
      },
      component: Index,
      children : [
        {
          path: '/',
          name : '/',
          component : Welcome
        },
        {
          path : '/hello' ,
          component : Hello
        },
        {
          path : '/clientClassify',
          name : 'clientClassify',
          component : clientClassify
        },
        {
          path : '/clinetRank',
          name : 'clientRank',
          component : clientRank
        },
        {
          path : '/area',
          name : area,
          component : area
        },
        {
          path : '/trade',
          name : 'trade',
          component : trade
        },
        {
          path : '/goodsList',
          name : 'goodsList',
          component : goodsList,
         },
          {
            path : '/goodsList/add',
            name : 'addGoods',
            component : addGoods
          }
          
        
      ]
    },
    {
      path : '/:id/login',
      name : 'login',
      component : Login
    },

    {
      path: '/aa',
      name: 'aa',
      component: Hello
    },
]

// 页面刷新，重新给 token 赋值
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'));
    store.commit('saveUser', JSON.parse(window.localStorage.getItem('user')));
    store.commit('saveCorp', JSON.parse(window.localStorage.getItem('corp')));
}

var router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    // 
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: 'aa',
                // query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;