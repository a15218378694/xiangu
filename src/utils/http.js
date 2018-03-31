'use strict'
var root = ''
var rootPos = '' 
if (process.env.NODE_ENV == 'production') {
  rootPos = 'http://api.map.baidu.com'
  let isTestBaseAPI = location.href.includes('test')
  root = 'http://merchant.xljkj.cn'
  if (isTestBaseAPI) {
    root = 'http://test.merchant.xljkj.cn'
  }
}
import axios from 'axios'
import qs from 'qs'
import util from './util'
import {
  Indicator
} from 'mint-ui';

axios.defaults.withCredentials = true
// axios.defaults.headers.common['tonken'] = util.getStore('token')
axios.interceptors.request.use(config => {

  Indicator.open('加载中...');
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: response.data.msg
  }
}

function checkCode(res) {
  Indicator.close();
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    if (res.msg) {
      util.toastEven(res.msg)
    } else {
      util.toastEven('出问题了..，请将问题反馈给我们吧')
    }
  }
  // if (res.data && (!res.data.success)) {
  //   alert(res.data.error_msg)
  // }
  if (res.data.code == -1) {
    if (winBri.getSheBei() == "Android") {
      vuePay.showLoginFromJs("-1")
    }
    if (winBri.getSheBei() == "iPhone") {
      let iosData = {
        isLog: "-1"
      };
      winBri.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("isLogOrder", iosData, function (resp) {});
      });
    }
    res.data = false
  }
  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      // 线上 http://merchant.xljkj.cn:80 测试 http://192.168.6.111:8080 192.168.8.102:80      
      baseURL: root,
      url,
      credentials: 'include',

      data: qs.stringify(data),
      timeout: 100000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  post1(url, data) {
    return axios({
      method: 'post',
      // 线上 http://merchant.xljkj.cn:80 测试 http://192.168.6.111:8080 192.168.8.102:80      
      baseURL: root,
      url,
      credentials: 'include',
      data,
      timeout: 10000,
      // headers: {
      //   'X-Requested-With': 'XMLHttpRequest',
      //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      // }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      // 线上 http://merchant.xljkj.cn:80 测试 http://192.168.6.111:8080 192.168.8.102:80
      baseURL: root,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  getPos(url, params) {
    return axios({
      method: 'get',
      // 线上 http://merchant.xljkj.cn:80 测试 http://192.168.6.111:8080 192.168.8.102:80
      baseURL: rootPos,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
