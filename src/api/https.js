import axios from 'axios';
import Qs from 'qs'
import { Message } from 'element-ui';

const tokens = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODQ0MzczMDAsIm5iZiI6MTU4MzgzMjUwMCwiaWF0IjoxNTgzODMyNTAwLCJjbGllbnRfaWQiOjEsImNsaWVudF9uYW1lIjoiRWNvbG9neSJ9.1RmPozkut4A6-MQCPauNKG-F3JZALx_knpJonGsVoVw'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://test.gj.wjeys.com';


//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      'Content-Type': 'application/json;charset=UTF-8'
    }
    // if(token){
    //   config.params = {'token':token}
    // }
    return config;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          error.message = '错误请求' ; Message('错误请求');
          break
        case 401:
          error.message = '未授权，请重新登录' ; Message('未授权，请重新登录');
          break
        case 403:
          error.message = '拒绝访问' ; Message('拒绝访问');
          break
        case 404:
          error.message = '请求错误,未找到该资源' ; Message('请求错误,未找到该资源');
          break
        case 405:
          error.message = '请求方法未允许' ; Message('请求方法未允许');
          break
        case 408:
          error.message = '请求超时' ; Message('请求超时');
          break
        case 500:
          error.message = '服务器端出错' ; Message('服务器端出错');
          break
        case 501:
          error.message = '网络未实现' ; Message('网络未实现');
          break
        case 502:
          error.message = '网络错误' ; Message('网络错误');
          break
        case 503:
          error.message = '服务不可用' ; Message('服务不可用');
          break
        case 504:
          error.message = '网络超时' ; Message('网络超时');
          break
        case 505:
          error.message = 'http版本不支持该请求' ; Message('http版本不支持该请求');
          break
        default:
          error.message = `连接错误${error.response.status}`; Message(`'连接错误'${error.response.status}`);
      }
    } else {
      error.message = "连接到服务器失败";  Message('连接到服务器失败');
    }
    return Promise.resolve(err.response)
  });


//http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errCode == 2) {
      router.push({
        path: "/login",
        querry: {redirect: router.currentRoute.fullPath}//从哪个页面跳转
      })
    }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
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

export function post(url, params = {}) {
  params.token = tokens;
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        if (response.status != 200){
          Message('数据错误');
          return false
        }
        resolve(response.data);
      }, err => {
        reject(err)
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
