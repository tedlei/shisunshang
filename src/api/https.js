import Vue from 'vue'
import {Toast} from 'vant';
import axios from 'axios';
import Qs from 'qs'
import store from "../store";
import router from "../router"
import address from "../../static/address"

Vue.use(Toast);

let tokens = '';
let ua = window.navigator.userAgent.toLocaleLowerCase();
let baseURL = 'http://admin.gjst.net';
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  for(let item of address){
        if(location.host==item.domain){
            baseURL = 'http://'+item.interface;
        }
  }
}

axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseURL;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'token': localStorage.getItem("usertoken"),
      // 'Content-Type': 'multipart/form-data'
    };
    return config;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          error.message = '错误请求';
          Toast('错误请求');
          break
        case 401:
          error.message = '未授权，请重新登录';
          Toast('未授权，请重新登录')
          break
        case 403:
          error.message = '拒绝访问';
          Toast('拒绝访问');
          break
        case 404:
          error.message = '请求错误,未找到该资源';
          Toast('请求错误,未找到该资源');
          break
        case 405:
          error.message = '请求方法未允许';
          Toast('请求方法未允许');
          break
        case 408:
          error.message = '请求超时';
          Toast('请求超时');
          break
        case 500:
          error.message = '服务器端出错';
          Toast('服务器端出错');
          break
        case 501:
          error.message = '网络未实现';
          Toast('网络未实现');
          break
        case 502:
          error.message = '网络错误';
          Toast('网络错误');
          break
        case 503:
          error.message = '服务不可用';
          Toast('服务不可用');
          break
        case 504:
          error.message = '网络超时';
          Toast('网络超时');
          break
        case 505:
          error.message = 'http版本不支持该请求';
          Toast('http版本不支持该请求');
          break
        default:
          error.message = `连接错误${error.response.status}`;
          Toast(`'连接错误'${error.response.status}`);
      }

    } else {
      error.message = "连接到服务器失败";
      Toast('连接到服务器失败');
    }
    return Promise.resolve(err.response)
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.status === 200) {

    } else if (response.data.status === 401 || response.data.status === 403) {
      localStorage.clear();
      Toast('会话已过期正在重新连接');
      console.log(response);
      location.href="/";
      // router.push({
      //   path: '/',
      // }).catch(data => {
      // })

    } else if (response.data.status === 500) {
      Toast(response.data.message);
    }
    return response;
  },
  error => {
    if (error.response.status == 401 || error.response.status === 403) {
      localStorage.clear();
      Toast('会话已过期正在重新连接');
      location.href="/";
      // router.push({
      //   path: '/',
      // }).catch(data => {
      // })
    } else if (error.response.status === 500) {
      // 服务器错误
      // do something
      return Promise.resolve(error)
    }
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  store.commit('setLoading',true);
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(response => {
        store.commit('setLoading',false);
        resolve(response);
      })
      .catch(err => {
        store.commit('setLoading',false);
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, params = {},) {
  params.token1 = 'code';
  store.commit('setLoading',true);
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(params),)
      .then(response => {
        store.commit('setLoading',false);
        if (response.status === 500) {
          Toast('数据错误')
          reject(false)
        } else if (response.status === 200 && response.data) {
          resolve(response.data)
          // success(response.data)
          // Toast('成功');
          // resolve(response.data);
          // console.log(resolve(response.data))
        }
      }, err => {
        store.commit('setLoading',false);
        reject(false)
      })
  })
}


/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

export default {baseURL, tokens,};
