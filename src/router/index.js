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
          meta: {title: '商品详情', goods: true}
        },
        {
          path: '/goodslist',
          name: 'goodslist',
          component: resolve => require(['@/components/children/goodslist/goodslist'], resolve),
          meta: {title: '商品列表', goods: false, showFooter: false,}
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
          path: '/mine/share',
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
          path: '/Special-area',
          name: 'Special-area',
          component: resolve => require(['@/components/children/Special-area/Special-area'], resolve),
          meta: {title: '专区', showFooter: false, goods: false}
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
          name: 'set',
          component: resolve => require(['@/components/children/set/set'], resolve),
          meta: {title: '个人设置', showFooter: false, goods: false,},
        },
        {
          path: '/set/Bank-card',
          name: 'Bank-card',
          component: resolve => require(['@/components/children/set/Bank-card'], resolve),
          meta: {title: '绑定银行卡', showFooter: false, goods: false,},
        },
        {
          path: '/Bank-card/add-bank-card',
          name: 'add-bank-card',
          component: resolve => require(['@/components/children/set/add-bank-card'], resolve),
          meta: {title: '添加银行卡', showFooter: false, goods: false,},
        },
        {
          path: '/set/set-pay-password',
          name: 'set-pay-password',
          component: resolve => require(['@/components/children/set/set-pay-password'], resolve),
          meta: {title: '设置支付密码', showFooter: false, goods: false,},
        },
        {
          path: '/set/set-phone',
          name: 'set-phone',
          component: resolve => require(['@/components/children/set/set-phone'], resolve),
          meta: {title: '绑定手机号', showFooter: false, goods: false,},
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
          path: '/mine/ad/addetails',
          name: 'addetails',
          component: resolve => require(['@/components/children/ad/addetails'], resolve),
          meta: {title: '广告详情', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad/articles',
          name: 'articles',
          component: resolve => require(['@/components/children/ad/articles'], resolve),
          meta: {title: '发布文章', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad/myad',
          name: 'myad',
          component: resolve => require(['@/components/children/ad/myad'], resolve),
          meta: {title: '我的发布', showFooter: false, goods: false,}
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
        {
          path: '/mine/record',
          name: 'record',
          component: resolve => require(['@/components/children/record/record'], resolve),
          meta: {title: 'record', showFooter: false, goods: false}
        },
        {
          path: '/mine/Myteam',
          name: 'Myteam',
          component: resolve => require(['@/components/children/Myteam/Myteam'], resolve),
          meta: {title: '我的团队', showFooter: false, goods: false, Same: true}
        },
      ],
      meta: {title: '商品详情', showFooter: false}
    },
  ]
})


