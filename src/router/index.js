import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{title:'登录'}
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta:{title:'首页'}
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta:{title:'你好'}
    }
  ]
})


