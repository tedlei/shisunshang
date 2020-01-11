import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home/home'
import classification from '@/components/classification/classification'
import store from '@/components/store/store'
import mine from '@/components/mine/mine'
import my_cart from '@/components/my_cart/my_cart'

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
      path: '/',
      name: 'home',
      component: home,
      meta:{title:'首页'}
    },
    {
      path: '/classification',
      name: 'classification',
      component: classification,
      meta:{title:'分类'}
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta:{title:'我的'}
    },
    {
      path: '/my_cart',
      name: 'my_cart',
      component: my_cart,
      meta:{title:'购物车'}
    },
    {
      path: '/store',
      name: 'store',
      component: store,
      meta:{title:'附近商家'}
    },

  ]
})


