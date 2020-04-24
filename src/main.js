// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui'
import Vant, { Dialog, Toast } from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/layout.scss'
import './assets/css/style.scss'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
import axios from 'axios'
import qs from 'qs'
import { post, patch, put } from './api/https'
import 'mint-ui/lib/style.css'
import { Api } from '../src/assets/js/verifyCodeTime.js'
//复制到粘贴板插件
import VueClipboard from 'vue-clipboard2'
//微信分享sdk
import wechatAuth from './assets/js/wechatConfig'
Vue.prototype.wechatAuth = wechatAuth;
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)


Api.init.call(Vue);

//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.Qs = qs

Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  // 解析url参数并获取code
  function getUrlParam (variable) {   //name为要获取的参数名
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
              var pair = vars[i].split("=");
              if(pair[0] == variable){return pair[1];}
      }
      return(false);
  }
  function getUrlParam1 (variable) {   //name为要获取的参数名
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=vars.length-1;i>-1;i--) {
              var pair = vars[i].split("=");
              if(pair[0] == variable){return pair[1];}
      }
      return(false);
  }
  // store.commit(SET_WX_JS_URL, document.URL);
  if (to.name != 'author'){
    // console.log("我不是授权页,就要判断有没有token")
    let token = localStorage.getItem('usertoken'); //获取缓存localStorage里面的token
    // console.log(token)
    if(!token){
      sessionStorage.setItem('sourceUrl', location.href);//记录当前访问的路由
      let state = getUrlParam1('state');
      // console.log(state)
      if(state==undefined) state = '';
      sessionStorage.setItem("state",state);
      location.href="/author";
    }else{
      sessionStorage.setItem('ios_share_url', location.href);//记录当前访问的路由
      // console.log(sessionStorage.getItem('ios_share_url'),11111);
      let userinfo = JSON.parse(localStorage.getItem('userinfo'));
      if(userinfo && to.path!='/goodsdetails' && to.path != '/mine/ad/addetails' && to.path != '/Signin'){
        shareConfig(userinfo);
      } 
    }
    function shareConfig (userinfo) {
      let ua = window.navigator.userAgent.toLocaleLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        // console.log('我去分享了')
        var url = '';
         if(is_ios()){
            // console.log('IOS')
            url = sessionStorage.getItem('ios_share_url').split('#')[0];
         }else{
            console.log('IOS否')
            url = 'http://' + location.host + to.fullPath;
         }
        wechatAuth(url,to,userinfo);
      }
    }
    function is_ios() {
        var u = navigator.userAgent;
        if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            return true;
        } else {
            return false;
    　   }
    }

  }

  // 解析url参数并获取code
  function getUrlParam(name) {   //name为要获取的参数名
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var rrr = decodeURIComponent(window.location.search);
    var r = rrr.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  }

  window.scrollTo(0, 0);
  /*路由发生改变修改页面的title */
  if (to.name == 'home') {
    // console.log(post)
    // console.log('我是主页')
    let ad_data = { method: 'get.web.info' };
    post('/api/v1/sets', ad_data)
      .then((res) => {
        document.title = res.data.webtitle;
      }).catch(function (error) {
        console.log(error);
      });
  } else if (to.name != 'Special-area' && to.meta.title && to.name != 'goodslist') {
    document.title = to.meta.title;
  }else if(to.name == 'goodslist'){
    //   console.log(to)
    document.title = to.query.name;
  }

  if(!['/goodsdetails/makeorder','/mine/invoice','/mine/myinvoice'].includes(to.path)){
    // console.log('我不是发票')
    store.commit('sendIvcMsg', 1);
  }
  next();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',

})
