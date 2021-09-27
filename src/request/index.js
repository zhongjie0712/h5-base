import axios from 'axios'
import { Toast } from 'vant'
import { BASE_URL } from '@/config'
// import store from '@/store'

/* 全局默认配置 */
const service = axios.create({ baseURL: BASE_URL, timeout: 60000 })

let requestCount = 0

/* 请求拦截器 */
service.interceptors.request.use(
  config => {
    requestCount++
    console.log('=== 请求拦截config ===', config)
    if (config.requestOption.showLoading === true) {
      Toast.loading({ message: '加载中...', forbidClick: true, duration: 0 })
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    requestCount--
    if (requestCount === 0) {
      Toast.clear()
    }
    return Promise.reject(error)
  }
)
/* 响应拦截器 */
service.interceptors.response.use(
  res => {
    console.log('=== 响应拦截res ===', res)
    requestCount--
    if (requestCount === 0) {
      Toast.clear()
    }
    return res
  },
  error => {
    requestCount--
    if (requestCount === 0) {
      Toast.clear()
    }
    Toast(error.message) // 网络请求错误
    return Promise.reject(error)
  }
)

const request = ({ method, url, params = {}, option = { showLoading: true } }) => {
  return new Promise((resolve, reject) => {
    // 执行异步ajax请求
    let promise
    if (method === 'GET') {
      promise = service({ method: 'get', url, params: params, requestOption: option })
    } else {
      promise = service({ method: 'post', url, data: params, requestOption: option })
    }
    promise
      .then(res => {
        if (res.status == 200 && res.data.code == '000000') {
          resolve(res.data)
        } else {
          Toast(res.data.msg)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

const uploadFile = ({ url, formData, options = { showLoading: true } }) => {
  return new Promise((resolve, reject) => {
    service({
      method: 'post',
      url,
      data: formData,
      requestOption: options,
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
      .then(res => {
        if (res.status == 200 && res.data.code == '000000') {
          resolve(res.data)
        } else {
          Toast(res.data.msg)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default {
  get: ({ url, params, option }) => request({ method: 'GET', url, params, option }),

  post: ({ url, params, option }) => request({ method: 'POST', url, params, option }),

  upload: ({ url, formData, option }) => uploadFile({ url, formData, option })
}
