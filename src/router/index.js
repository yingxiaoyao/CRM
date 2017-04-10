import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'

import Login from '@/components/login/login'
import Hello from '@/components/Hello'
import Index from '@/components/index'
import Welcome from '@/components/welcome/welcome'


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
        }
      ]
    },
    {
      path : '/:id/login',
      name : 'login',
      component : Login
    },

    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
]

// 页面刷新，重新给token 赋值
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'))
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
                path: 'hello',
                // query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})

export default router;