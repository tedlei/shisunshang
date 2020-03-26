import axios from 'axios';
import Qs from 'qs'
import {Toast} from "vant";
import store from "../store";


let tokens = '';
let ua = window.navigator.userAgent.toLocaleLowerCase();
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  if (!tokens) {
    setTimeout(() => {
      tokens = store.state.isLogin;
    }, 1000)
  } else {
    tokens = store.state.isLogin;
  }

} else {
  tokens = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODU3MDg4MjUsIm5iZiI6MTU4NTEwNDAyNSwiaWF0IjoxNTg1MTA0MDI1LCJjbGllbnRfaWQiOjEsImNsaWVudF9uYW1lIjoiMTIzNDU2In0.SkfpxJNPgZeC4kFD53oIKa_0EIwJRj0tDytZafEWa14';
}

const baseURL = 'http://test.gj.wjeys.com';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = baseURL;

//http request 拦截器
axios.interceptors.request.use(
  config => {
    // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
    config.data = JSON.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'token': store.state.isLogin || '',
      // 'token': tokens,
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
    //如果token值发生改变的时候，替换token值
    // if (response.headers.token) {
    //   store.commit('isLogin', response.headers.token);
    // }
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)

// const instance = axios.create()
// // 添加一个响应拦截器
// instance.interceptors.response.use(response => {
//   store.commit("setLoading");
//   // 在这里对返回的数据进行处理
//   let status = response.status
//   let data = response.data
//   if (status === 200) {
//     Toast('成功')
//     if (data.code !== '0000') {
//       store.commit("setLoading");
//     }
//     return Promise.resolve(data)
//   } else {
//     Toast('失败')
//     return Promise.reject(response)
//   }
// }, error => {
//   // response error
//   console.log(error)
//   this.$store.commit("setLoading");
//   Toast('请求异常，请联系管理员！')
//   return Promise.reject(error)
// })


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
export function post(url, params,) {
  params.token1 = 'code';
  return new Promise((resolve, reject) => {
    axios.post(url, Qs.stringify(params),)
      .then(response => {
        if (response.status === 500) {
          Toast('数据错误')
          return
        } else if (response.status === 200 && response.data) {
          resolve(response.data)
          // success(response.data)
          // Toast('成功');
          // resolve(response.data);
          // console.log(resolve(response.data))
        }
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

export default {baseURL, tokens,};
