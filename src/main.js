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
  //===== 判断是否为微信浏览器 =====
  let ua = window.navigator.userAgent.toLocaleLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    if (to.name != 'author') {//判断当前是否是新建的auth路由空白页面
      let tokens = store.getters.isLogin;
      localStorage.setItem('sourceUrl', to.fullPath);
      if (!tokens) {
        let phone = getUrlParam('state') || '';
        //请求微信授权,并跳转到 /WxAuth 路由
        let appId = 'wxf730b0b04586d06f'
        let url = 'http://m.wjeys.com';
        let {path,query} = to
        if(path==='/') url += '/author'
        else {
          url += path;
          if(JSON.stringify(query)!=="{}") url+= '?' 
          for(let name in query){
            url += name+'='+query[name]+'&'
          }
        }
        if(url.slice(url.length-1,url.length)==="&") url = url.slice(0,url.length-1)
        console.log(url);
        let redirectUrl = encodeURIComponent(url);
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=${phone}#wechat_redirect`
        return
      } else {
        next();
      }
    } else {
      next();
    }
  } else {
    next();
  }
  ;

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
  if (to.meta.title == '首页') {
    // console.log(post)
    let ad_data = { method: 'get.web.info' };
    post('/api/v1/sets', ad_data)
      .then((res) => {
        document.title = res.data.webtitle;
      }).catch(function (error) {
        console.log(error);
      });
  } else if (to.name != 'Special-area' && to.meta.title) {
    document.title = to.meta.title;
  }
  if (['home', 'mine', 'my_cart', 'business', 'classification', 'goodsDATA'].includes(to.name)) {
    //购物车数量
    let ad_data = {
      method: 'get.goods.cart.count',
    };
    post('/api/v1/GoodsCart', ad_data)
      .then((res) => {
        // console.log(res);
        store.commit('setCartNum', res.data.num)
      }).catch(function (error) {
        console.log(error);
      });
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
