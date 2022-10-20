import axios from 'axios'
import { getUserInfo } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

const msgBox: any = null
const config = (window as any).$baseURL
// 创建axios实例
const service = axios.create({
  baseURL: process.env.ENV === 'production' ? config.apiUrl : process.env.VUE_APP_API,
  timeout: 30000, // 超时
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(config => {
  if (getUserInfo() && getUserInfo().token) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config.headers.token = getUserInfo().token.toString() // 自定义token
  }

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?'
    for (const propName of Object.keys(config.params)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const value = config.params[propName]
      const part = encodeURIComponent(propName) + '='
      if (value !== null && typeof (value) !== 'undefined') {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            const params = propName + '[' + key + ']'
            const subPart = encodeURIComponent(params) + '='
            url += subPart + encodeURIComponent(value[key]) + '&'
          }
        } else {
          url += part + encodeURIComponent(value) + '&'
        }
      }
    }
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  // 获取错误信息
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const msg = errorCode[code] || res.data.message || errorCode.default
  if (code === 403) {
    if (msgBox) return false
    setTimeout(() => {
      location.href = '/'
    }, 1500)
  } else if (code === 400) {
    return res.data
  } else if (code !== 200) {
    return res.data
  } else {
    return res.data
  }
},
// eslint-disable-next-line node/handle-callback-err
error => {
  return null
}
)

export default service
