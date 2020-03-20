// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/layout.scss'
import './assets/css/style.scss'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios'
import qs from 'qs'
import {post, fetch, patch, put} from './api/https'
import tokens from './api/https'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.Qs = qs

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // var x = localStorage.getItem('x');
  // console.log(x)
  // console.log(to)
  // if (to.name != 'author' && !x ) {
  //   let wxUserInfo = store.getters.isLogin;
  //   if (!wxUserInfo) {
  //
  //     //保存当前路由地址，授权后还会跳到此地址
  //     localStorage.setItem('wxRedirectUrl', to.fullPath)
  //     //请求微信授权,并跳转到 /WxAuth 路由
  //     // getUserCode()
  //     let appId = 'wxf730b0b04586d06f'
  //     let redirectUrl = encodeURIComponent('http://m.wjeys.com/author');
  //     setTimeout(() => {
  //       window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
  //     }, 5000)
  //
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }


  // if (tokens.token) {
  //   //已存在token
  //   next();
  //   return false
  // } else {
  //   var code = getUrlParam('code');//获取url 上面的code
  //   if (!code) {//假如没code
  //     getUserCode();//请求服务器获取code
  //   } else {
  //     //使用code 去登录
  //     var state = getUrlParam('state');//获取url 上面的code
  //     let msg = {
  //       method: 'login.wechat.oauth2.step2',
  //       code: code,
  //       referee_mobile: state,
  //     };
  //     post('api/v1/user', msg)
  //       .then((response) => {
  //         if (response.status == 200) {
  //           sessionStorage.setItem('token', response.data.token);
  //           setTimeout(() => {
  //             window.location.href = 'http://m.wjeys.com/'
  //           }, 500)
  //         }
  //         console.log(response)
  //       }).catch(function (error) {
  //       console.log(error);
  //     });
  //   }
  // }
  //
  // next();

  // 解析url参数并获取code
  // function getUrlParam(name) {   //name为要获取的参数名
  //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //   var rrr = decodeURIComponent(window.location.search);
  //   var r = rrr.substr(1).match(reg);
  //   if (r != null) return unescape(r[2]);
  //   return null;
  // }
  //
  // // 请求服务器获取code 方法
  // function getUserCode() {
  //   let back_url = encodeURIComponent('http://m.wjeys.com/author');
  //   let referee_mobile = '';
  //   let msg = {
  //     method: 'login.wechat.oauth2.step1',
  //     back_url: back_url,
  //     referee_mobile: referee_mobile,
  //   }
  //   post('api/v1/user', msg)// 获取用户信息,后端可首先通过cookie,session等判断,没有信息则通过code获取
  //     .then((response) => {
  //       if (response.status == 200) {
  //         window.location.href = response.data
  //       }
  //     }).catch(function (error) {
  //   });
  // }

  window.scrollTo(0, 0);
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
