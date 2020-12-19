// 封装axios请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
  // 备用地址：baseURL: 'http://api-toutiao-web.itheima.net/'
})

export default request

// 设置请求拦截器，为每一个需要授权的接口设置 Authorization 请求头
request.interceptors.request.use(function (config) {
  // 发起请求时会经过这里
  // config 是发起本次请求的配置对象，其中包括请求地址，请求方法和请求头，请求头中包含 Authorization 字段
  // console.log(config)
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // ******注意：最后一定要返回 config，否则请求就停在这里出去了
  // 这一句相当于 请求拦截器 放行的标记
  return config
}, function (error) {
  // 如果请求出错了(没有发送出去)，会经过这里
  return Promise.reject(error)
})

// 设置响应拦截器，主要解决 Token 过期的问题
