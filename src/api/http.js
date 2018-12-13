import axios from 'axios'
import errorHandeler from './error.js'
import { routePush } from '../utils'

axios.defaults.withCredentials = true
axios.defaults.timeout = 90000
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
// Add a request interceptor 请求拦截
// axios.interceptors.request.use(function(config) {
//   // Do something before request is sent
//   // console.log(config)
//   return config
// }, function(error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// Add a response interceptor 响应拦截
axios.interceptors.response.use(function (response) {
  if (
    response.data &&
    (response.data.state === 'nologin' || response.data.state === 'userEnable')
  ) {
    // window.location.href = window.location.origin + '/login'
    // routePush({ name: 'login' })
    window.location.href = window.location.origin + '/#/login'
    // const userEnable = response.data.state === 'userEnable'
    // const msg = response.data.msg || response.data.state
    // store.commit(types.SET_IS_LOGIN, {
    //   userEnable: userEnable,
    //   msg: msg,
    //   isLogin: false
    // })
  }
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

export const http = {
  get(url, config) {
    return new Promise((resolve, reject) => {
      axios.get(url, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        const data = creatErrorData(err, url)
        resolve(data)
        errorHandeler(err)
      })
    })
  },
  post(url, params, config) {
    return new Promise((resolve, reject) => {
      axios.post(url, params, config)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        const data = creatErrorData(err, url)
        resolve(data)
        errorHandeler(err)
      })
    })
  }
}
export const CancelToken = axios.CancelToken
export const getCancelSource = function() {
  return CancelToken.source()
}
function creatErrorData(err, url) {
  const data = {
    state: 'error',
    msg: 'error',
    err,
    url
  }
  if (err) {
    let msg = `Network Error `
    if (err.response) {
      msg += `${err.response.status} ${err.message}`
    } else if (err.request) {
      msg += `${err.request.status} Requset Fail  ${err.message}`
    } else {
      msg = err.message
    }
    data.msg = msg
  }
  return data
}
export const install = function (Vue) {
  if (!Vue.prototype.$http) {
    Vue.prototype.$http = http
  }
}
export default install
