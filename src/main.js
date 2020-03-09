// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/layout.scss'
import './assets/css/style.scss'

import axios from 'axios'
import qs from 'qs'
import {post,fetch,patch,put} from './api/https'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.Qs = qs

Vue.use(ElementUI)
Vue.config.productionTip = false;

// 根据路由设置标题
router.beforeEach((to, from, next) => {

  window.scrollTo(0, 0);

  /*路由发生改变修改页面的title */
  if (to.meta.title) {

    document.title = to.meta.title
    // console.log(to.meta.title)
  }
  next();
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
