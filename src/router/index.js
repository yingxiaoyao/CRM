import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Hello from '@/components/Hello'
import Index from '@/components/index'
import Welcome from '@/components/welcome/welcome'


Vue.use(Router)

export default new Router({
  // mode : 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children : [
        {
          path: '/',
          component : Welcome
        },
        {
          path : '/hello' ,
          component : Hello
        }
      ]
    },
    {
      path : '/:id/Login',
      component : Login
    },
    
    // {
    //   path: '/hello',
    //   name: 'Hello',
    //   component: Hello
    // },
  ]
})
