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
  if (to.name != 'author'){
    //sessionStorage.setItem('usertoken',12312321312);
    let token = sessionStorage.getItem('usertoken'); //获取VUEX里面的token
    // console.log(token)
    if(!token){
      sessionStorage.setItem('sourceUrl', to.fullPath);//记录当前访问的路由
      let state = getUrlParam('state');
      if(state==undefined) state = '';
      sessionStorage.setItem("state",state);
      location.href="/author";
    }
    /*路由发生改变修改页面的title */
    // if (to.meta.title == '首页') {
    //   // console.log(post)
    //   let ad_data = { method: 'get.web.info' };
    //   post('/api/v1/sets', ad_data)
    //     .then((res) => {
    //       document.title = res.data.webtitle;
    //     }).catch(function (error) {
    //       console.log(error);
    //     });
    // } else if (to.name != 'Special-area' && to.meta.title) {
    //   document.title = to.meta.title;
    // }
    // if (['home', 'mine', 'my_cart', 'business', 'classification', 'goodsDATA'].includes(to.name)) {
    //   //购物车数量
    //   let ad_data = {
    //     method: 'get.goods.cart.count',
    //   };
    //   post('/api/v1/GoodsCart', ad_data)
    //     .then((res) => {
    //       // console.log(res);
    //       store.commit('setCartNum', res.data.num)
    //     }).catch(function (error) {
    //       console.log(error);
    //     });
    // }
    // console.log('Min进来了')
    // if(location.href.split('state=')[1]){
    //     console.log('我是分享地址跳转')
    //     // location.href='http://m.wjeys.com/';
    //     // router.push({path:'/'})
    // }
  }
  window.scrollTo(0, 0);
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
