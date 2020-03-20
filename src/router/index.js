import Vue from 'vue'
import Router from 'vue-router'
import goodschildren from '@/components/children/child'
import order from '@/components/children/order/order'

import home from '@/components/home/home'
import classification from '@/components/classification/classification'
import business from '@/components/business/business'
import mine from '@/components/mine/mine'
import my_cart from '@/components/my_cart/my_cart'
import author from '../components/author'

import goodsDATA from '../components/goods/goodsDATA'
import storeDetails from '../components/storeDetails/storeDetails'
// const order = resolve => require(['@/components/order/order'], resolve)

Vue.use(Router)

export default new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    // {
    //   path: '/',
    //   redirect: {name:'author'},
    // },
    {
      path: '/author',
      name: 'author',
      component: author,
      meta: {title: '授权', showFooter: false}
    },
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
          path: '/goodsdetails',
          name: 'goodsDATA',
          component: goodsDATA,
          meta: {
            title: 'goodsDATA',
            goods: true
          }
        },
        {
          path: '/storeDetails',
          name: 'storeDetails',
          component: storeDetails,
          meta: {
            title: '店铺详情',
            goods: false
          }
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
          meta: {title: '消息新闻中心', showFooter: false, goods: false, news: true}
        },
        {
          path: '/news/newsdetail',
          name: 'newsdetail',
          component: resolve => require(['@/components/children/news/newsdetail'], resolve),
          meta: {title: '新闻详情', showFooter: false, goods: false,}
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
          path: '/mine/upgrade',
          name: 'upgrade',
          component: resolve => require(['@/components/children/upgrade/upgrade'], resolve),
          meta: {title: '在线升级', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Recharge',
          name: 'Recharge',
          component: resolve => require(['@/components/children/Recharge/Recharge'], resolve),
          meta: {title: '充值活动', showFooter: false, goods: false,}
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
          path: '/mine/invoice',
          name: 'invoice',
          component: resolve => require(['@/components/children/invoice/invoice'], resolve),
          meta: {title: '发票信息', showFooter: false, goods: false,}
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
        {
          path: '/mine/More-tools',
          name: 'More-tools',
          component: resolve => require(['@/components/children/More-tools/More-tools'], resolve),
          meta: {title: '更多工具', showFooter: false, goods: false, Same: true}
        },
        {
          path: '/mine/Rechargemoney',
          name: 'Rechargemoney',
          component: resolve => require(['@/components/children/More-tools/Rechargemoney/Rechargemoney'], resolve),
          meta: {title: '在线充值', showFooter: false, goods: false,}
        },
        {
          path: '/mine/R-record',
          name: 'R-record',
          component: resolve => require(['@/components/children/More-tools/Rechargemoney/R-record'], resolve),
          meta: {title: '充值记录', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Cash-withdrawal',
          name: 'Cash-withdrawal',
          component: resolve => require(['@/components/children/More-tools/Cash-withdrawal/Cash-withdrawal'], resolve),
          meta: {title: '申请提现', showFooter: false, goods: false,}
        },

        {
          path: '/mine/withdrawRecord',
          name: 'withdrawRecord',
          component: resolve => require(['@/components/children/More-tools/Cash-withdrawal/withdrawRecord'], resolve),
          meta: {title: '提现记录', showFooter: false, goods: false,}
        },

        {
          path: '/mine/Trans',
          name: 'Trans',
          component: resolve => require(['@/components/children/More-tools/Trans/Trans'], resolve),
          meta: {title: '账户互转', showFooter: false, goods: false,}
        },
        {
          path: '/mine/certification',
          name: 'certification',
          component: resolve => require(['@/components/children/More-tools/certification/certification'], resolve),
          meta: {title: '实名认证', showFooter: false, goods: false,}
        },



      ],
      meta: {title: '商品详情', showFooter: false}
    },
  ]
})



