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
import authorTwo from '../components/authorTwo'
import ex001 from '../components/ex001'
import goodsDATA from '../components/goods/goodsDATA'
import storeDetails from '../components/storeDetails/storeDetails'
import applicationcs from '../components/children/applicationcs/applicationcs'
import articles from '../components/children/ad/articles'
import myad from '@/components/children/ad/myad'
import Signin from '../components/Signin/Signin'
import certification from '@/components/children/More-tools/certification/certification'
import Trans from '@/components/children/More-tools/Trans/Trans'
import withdrawRecord from '@/components/children/More-tools/Cash-withdrawal/withdrawRecord'
import Cashwithdrawal from '@/components/children/More-tools/Cash-withdrawal/Cash-withdrawal'
import Rrecord from '@/components/children/More-tools/Rechargemoney/R-record'
import Rechargemoney from '@/components/children/More-tools/Rechargemoney/Rechargemoney'
import invoice from '@/components/children/invoice/invoice'
import Addaddress from '@/components/children/Add-address/Add-address'
import Address from '@/components/children/Address/Address'
import addetails from '@/components/children/ad/addetails'
import merchantApplication from '@/components/children/merchantApplication/merchantApplication'
import merchantApplicationEidet from '@/components/children/merchantApplicationEidet/merchantApplicationEidet'
import nearby from '@/components/children/nearby/nearby'
import recommendedShop from '@/components/children/recommendedShop/recommendedShop'
import setphone from '@/components/children/set/set-phone'
import Grade from '@/components/children/set/Grade'
import setpaypassword from '@/components/children/set/set-pay-password'
import addbankcard from '@/components/children/set/add-bank-card'
import Bankcard from '@/components/children/set/Bank-card'
import Orderdetails from '@/components/children/Orderdetails/Orderdetails'
import evaluate from '@/components/children/evaluate/evaluate'
import myinvoice from '@/components/children/invoice/myinvoice'
import store from "../store";

// lm
import help from '@/components/pages_lm/help/help'
import helpList from '@/components/pages_lm/help/list'
import helpDetail from '@/components/pages_lm/help/detail'
import upgrade from '@/components/pages_lm/upgrade/upgrade'
import codePage from '@/components/pages_lm/codePage/codePage'
import deal from '@/components/pages_lm/upgrade/deal'
import transferMoney from '@/components/pages_lm/transferMoney/transferMoney'


Vue.use(Router)

const $router = new Router({
  mode: 'history',  //去掉url中的#
  routes: [
    {
      path: '/author',
      name: 'author',
      component: author,
      meta: {title: '授权', showFooter: false}
    },
    {
        path: '/authorTwo',
        name: 'authorTwo',
        component: authorTwo,
        meta: {title: '授权', showFooter: false}
    },
    {
      path: '/ex001',
      name: 'ex001',
      component: ex001,
    },
    
    {
      path: '/',
      name: 'home',
      component: home,
      meta: {title: '首页', showFooter: true, allowShare: true}
    },
    {
      path: '/Signin',
      name: 'Signin',
      component: Signin,
      meta: {title: '签到', showFooter: false}
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
            title: '',
            goods: true
          }
        },
        {
          path: '/uploadpic',
          name: 'uploadpic',
          component: resolve => require(['@/components/children/uploadpic/uploadpic'], resolve),
          meta: {title: '拍照上传', showFooter: false, goods: false}
        },
        {
          path: '/Luckdraw',
          name: 'Luckdraw',
          component: resolve => require(['@/components/children/Luckdraw/Luckdraw'], resolve),
          meta: {title: '抽奖', showFooter: false, goods: false}
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
          path: '/goodsdetails/successfulPayment',
          name: 'successfulPayment',
          component: resolve => require(['@/components/children/successfulPayment/successfulPayment'], resolve),
          meta: {title: '支付成功', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/order',
          name: 'order',
          component: resolve => require(['@/components/children/order/order'], resolve),
          meta: {title: '我的订单', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/evaluate',
          name: 'evaluate',
          component: evaluate,
          meta: {title: '评价商品', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/customerService',
          name: 'customerService',
          component: resolve => require(['@/components/children/customerService/customerService'], resolve),
          meta: {title: '售后', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/applicationcs',
          name: 'applicationcs',
          component: applicationcs,
          meta: {title: '申请售后', showFooter: false, goods: false}
        },
        {
          path: '/goodsdetails/Orderdetails',
          name: 'Orderdetails',
          component: Orderdetails,
          meta: {title: '订单详情', showFooter: false, goods: false}
        },
        {
          path: '/mine/share',
          name: 'share',
          component: resolve => require(['@/components/children/share/share'], resolve),
          meta: {title: '产品分享', showFooter: true, goods: false}
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
          component: Bankcard,
          meta: {title: '绑定银行卡', showFooter: false, goods: false,},
        },
        {
          path: '/Bank-card/add-bank-card',
          name: 'add-bank-card',
          component: addbankcard,
          meta: {title: '添加银行卡', showFooter: false, goods: false,},
        },
        {
          path: '/set/set-pay-password',
          name: 'set-pay-password',
          component: setpaypassword,
          meta: {title: '设置支付密码', showFooter: false, goods: false,},
        },
        {
          path: '/set/set-phone',
          name: 'set-phone',
          component: setphone,
          meta: {title: '绑定手机号', showFooter: false, goods: false,},
        },
        {
            path: '/set/Grade',
            name: 'Grade',
            component: Grade,
            meta: {title: '我的会员等级', showFooter: false, goods: false,},
          },
        {
            path: '/set/feedback',
            name: 'feedback',
            component: resolve => require(['@/components/children/set/feedback'], resolve),
            meta: {title: '反馈中心', showFooter: false, goods: false,},
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
          meta: {title: '签到金在线充值', showFooter: false, goods: false,}
        },
        {
          path: '/mine/recommendedShop',
          name: 'recommendedShop',
          component: recommendedShop,
          meta: {title: '申请推荐开店', showFooter: false, goods: false,}
        },
        {
          path: '/mine/nearby',
          name: 'nearby',
          component: nearby,
          meta: {title: '我的入驻', showFooter: false, goods: false,}
        },
        {
          path: '/mine/merchantApplication',
          name: 'merchantApplication',
          component: merchantApplication,
          meta: {title: '商家入驻', showFooter: false, goods: false,}
        },
        {
          path: '/mine/merchantApplicationEidet',
          name: 'merchantApplicationEidet',
          component: merchantApplicationEidet,
          meta: {title: '编辑', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad',
          name: 'ad',
          component: resolve => require(['@/components/children/ad/ad'], resolve),
          meta: {title: '微信营销广告', showFooter: false, goods: false,}
        },
        {
          path: '/mine/myShare',
          name: 'myShare',
          component: resolve => require(['@/components/mine/myShare/myShare'], resolve),
          meta: {title: '我的分享', showFooter: false, goods: false,}
        },
        {
            path: '/mine/PosterStand',
            name: 'PosterStand',
            component: resolve => require(['@/components/mine/myShare/PosterStand'], resolve),
            meta: {title: '下载海报展架', showFooter: false, goods: false,}
        },
        {
            path: '/mine/PosterStandTwo',
            name: 'PosterStandTwo',
            component: resolve => require(['@/components/mine/myShare/PosterStandTwo'], resolve),
            meta: {title: '下载海报展架', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad/addetails',
          name: 'addetails',
          component: addetails,
          meta: {title: '广告详情', showFooter: true, goods: false,}
        },
        {
          path: '/mine/ad/articles',
          name: 'articles',
          component: articles,
          meta: {title: '发布文章', showFooter: false, goods: false,}
        },
        {
          path: '/mine/ad/myad',
          name: 'myad',
          component: myad,
          meta: {title: '我的发布', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Address',
          name: 'Address',
          component: Address,
          meta: {title: '地址管理', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Add-address',
          name: 'Add-address',
          component: Addaddress,
          meta: {title: '添加收货地址', showFooter: false, goods: false,}
        },
        {
          path: '/mine/myinvoice',
          name: 'myinvoice',
          component: myinvoice,
          meta: {title: '我的发票', showFooter: false, goods: false,}
        },
        {
          path: '/mine/invoice',
          name: 'invoice',
          component: invoice,
          meta: {title: '发票信息', showFooter: false, goods: false,}
        },
        {
          path: '/mine/record',
          name: 'record',
          component: resolve => require(['@/components/children/record/record'], resolve),
          meta: {title: '财务记录', showFooter: false, goods: false}
        },
        {
          path: '/mine/Myteam',
          name: 'Myteam',
          component: resolve => require(['@/components/children/Myteam/Myteam'], resolve),
          meta: {title: '我的分享', showFooter: false, goods: false, Same: true}
        },
        {
          path: '/mine/teamList',
          name: 'TeamList',
          component: resolve => require(['@/components/children/Myteam/TeamList'], resolve),
          meta: {title: '我的分享', showFooter: false, goods: false, Same: true}
        },
        {
          path: '/mine/MyteamBusiness',
          name: 'MyteamBusiness',
          component: resolve => require(['@/components/children/Myteam/business'], resolve),
          meta: {title: '我的推荐商家', showFooter: false, goods: false, Same: true}
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
          component: Rechargemoney,
          meta: {title: '在线充值', showFooter: false, goods: false,}
        },
        {
          path: '/mine/R-record',
          name: 'R-record',
          component: Rrecord,
          meta: {title: '充值记录', showFooter: false, goods: false,}
        },
        {
          path: '/mine/Cash-withdrawal',
          name: 'Cash-withdrawal',
          component: Cashwithdrawal,
          meta: {title: '申请提现', showFooter: false, goods: false,}
        },

        {
          path: '/mine/withdrawRecord',
          name: 'withdrawRecord',
          component: withdrawRecord,
          meta: {title: '提现记录', showFooter: false, goods: false,}
        },

        {
          path: '/mine/Trans',
          name: 'Trans',
          component: Trans,
          meta: {title: '账户互转', showFooter: false, goods: false,}
        },
        {
          path:'/mine/transferMoney',
          name:'transferMoney',
          component:transferMoney,
          meta: {
            title: '充值金转账',
            showFooter: false,     //配置底部tabbar
          },
        },
        {
          path: '/mine/certification',
          name: 'certification',
          component: certification,
          meta: {title: '实名认证', showFooter: false, goods: false,}
        },
        {
          path: '/codePage',
          name: 'codePage',
          component: codePage,
          meta: {title: '石笋山生态平台', showFooter: false, goods: false,}
        },
        {    //帮助中心
          path: '/help',
          component: help,
          children: [
            {   //帮助中心列表
              path: '',
              component: helpList,
              meta: {
                title: '帮助中心',
                showFooter: false,     //配置底部tabbar
              },
            },
            {   //帮助中心详情
              path: 'helpDetail',
              component: helpDetail,
              meta: {
                title: '帮助中心详情',
                showFooter: false,     //配置底部tabbar
              },
            }
          ],
        },
        {
          path:'/upgrade',
          name:'upgrade',
          component:upgrade,
          meta: {
            title: '在线升级',
            showFooter: false,     //配置底部tabbar
          },
        },
        {
          path:'/deal',
          name:'deal',
          component:deal,
          meta: {
            title: '协议和政策',
            showFooter: false,     //配置底部tabbar
          },
        }
      ],
      meta: {title: '商品详情', showFooter: false}
    },
  ]
});


// 解决Loading chunk (\d)+ failed问题
$router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = $router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    $router.replace(targetPath);
  }
});
export default $router




