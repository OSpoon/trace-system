import Vue from 'vue'
import axios from 'axios'
import { Dialog } from 'vant'

const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
}

// 创建一个AXIOS实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 16000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 拦截重复请求(即当前正在进行的相同请求)
    const requestData = getRequestIdentify(config, true)
    removePending(requestData, true)

    config.cancelToken = new CancelToken((c) => {
      pending[requestData] = c
    })

    // 是否开启loading
    if (config.showLoading) {
      Vue.prototype.$toast.loading({
        duration: 0,
        mask: true,
        forbidClick: true,
        message: '加载中...',
        loadingType: 'spinner'
      })
    }

    // 请求发送前的预处理(如:获取token等)
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-AUTH-TOKEN'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-AUTH-TOKEN'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    Vue.prototype.$toast('网络出错，请重试')
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 把已经完成的请求从 pending 中移除
    const requestData = getRequestIdentify(response.config)
    removePending(requestData)

    if (response.config.showLoading) {
      Vue.prototype.$toast.clear()
    }

    const res = response.data
    return res
  },
  error => {
    console.log(error.message)
    if (error) {
      if (error.config && error.config.showLoading) {
        Vue.prototype.$toast.clear()
      }
      if (error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '错误请求'
            break
          case 401:
            error.message = '未授权，请重新登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = '请求错误,未找到该资源'
            break
          case 405:
            error.message = '请求方法未允许'
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器端出错'
            break
          case 501:
            error.message = '网络未实现'
            break
          case 502:
            error.message = '网络错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网络超时'
            break
          case 505:
            error.message = 'http版本不支持该请求'
            break
          default:
            error.message = `连接错误${error.response.status}`
        }
        const errData = {
          code: error.response.status,
          message: error.message
        }
        console.log('统一错误处理: ', errData)
        Dialog({ title: '提示', message: errData.message || 'Error' })
      } else if (error.request) {
        Vue.prototype.$toast('网络出错，请稍后重试')
      }
    }
    return Promise.reject(error)
  }
)

export default service
