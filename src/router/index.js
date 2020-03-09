import Vue from 'vue'
import Router from 'vue-router'
import goodschildren from '@/components/children/child'
import Goodsdetails from '@/components/children/goodsdetails/goodsdetails'
import order from '@/components/children/order/order'

import home from '@/components/home/home'
import classification from '@/components/classification/classification'
import business from '@/components/business/business'
import mine from '@/components/mine/mine'
import my_cart from '@/components/my_cart/my_cart'


// const order = resolve => require(['@/components/order/order'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {title: '首页', showFooter: true}
    },
    {
      path: '/classification',
      name: 'classification',
      component: classification,
      meta: {
        title: '分类',
        index: 0,
        showFooter: true
      }
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
      meta: {title: '我的', showFooter: true}
    },
    {
      path: '/my_cart',
      name: 'my_cart',
      component: my_cart,
      meta: {title: '购物车', showFooter: true}
    },
    {
      path: '/business',
      name: 'business',
      component: business,
      // children: [
      //   {
      //     path: '/',
      //     meta: {showFooter: false}
      //   }],
      meta: {
        title: '附近商家',
        index: 0,
        showFooter: true
      }
    },
    {
      path: '/goodsdetails',
      component: goodschildren,
      children: [
        {
          path: '',
          name: 'goodsdetails',
          component: Goodsdetails,
          meta: {goods: true}
        },
        {
          path: '/goodsdetails/makeorder',
          name: 'makeorder',
          component: resolve => require(['@/components/children/makeorder/makeorder'], resolve),
          meta: {title: '确认订单', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/order',
          name: 'order',
          component: resolve => require(['@/components/children/order/order'], resolve),
          meta: {title: '我的订单', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/Orderdetails',
          name: 'Orderdetails',
          component: resolve => require(['@/components/children/Orderdetails/Orderdetails'], resolve),
          meta: {title: '订单详情', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/share',
          name: 'share',
          component: resolve => require(['@/components/children/share/share'], resolve),
          meta: {title: '产品分享', showFooter: false, goods: false}
        },
        {
          path: '/business/storemsg',
          name: 'StoreMsg',
          component: resolve => require(['@/components/children/StoreMsg/StoreMsg'], resolve),
          meta: {title: '商家信息', showFooter: false, goods: false}
        },
        {
          path: '/searchResult',
          name: 'searchResult',
          component: resolve => require(['@/components/children/searchResult/searchResult'], resolve),
          meta: {title: '搜索结果', showFooter: false, goods: false}
        },
        {
          path: '/news',
          name: 'news',
          component: resolve => require(['@/components/children/news/news'], resolve),
          meta: {title: '消息中心', showFooter: false, goods: false, news: true}
        },
        {
          path: '/mine/usermsg',
          name: 'usermsg',
          component: resolve => require(['@/components/children/usermsg/usermsg'], resolve),
          meta: {title: '个人信息', showFooter: false, goods: false,}
        },
        {
          path: '/mine/myfootprint',
          name: 'myfootprint',
          component: resolve => require(['@/components/children/myfootprint/myfootprint'], resolve),
          meta: {title: 'footprint', showFooter: false, goods: false, footprint: true}
        },
        {
          path: '/mine/set',
          name: ' set',
          component: resolve => require(['@/components/children/set/set'], resolve),
          meta: {title: '个人设置', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Recharge',
          name: ' Recharge',
          component: resolve => require(['@/components/children/Recharge/Recharge'], resolve),
          meta: {title: '充值', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad',
          name: 'ad',
          component: resolve => require(['@/components/children/ad/ad'], resolve),
          meta: {title: '微信营销广告', showFooter: false, goods: false,}
        },
        {
          path: '/mine/articles',
          name: 'articles',
          component: resolve => require(['@/components/children/articles/articles'], resolve),
          meta: {title: '发布文章', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Address',
          name: 'Address',
          component: resolve => require(['@/components/children/Address/Address'], resolve),
          meta: {title: '地址管理', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Add-address',
          name: 'Add-address',
          component: resolve => require(['@/components/children/Add-address/Add-address'], resolve),
          meta: {title: '添加收货地址', showFooter: false, goods: false,}
        },
      ],
      meta: {title: '商品详情', showFooter: false}
    },
  ]
})


