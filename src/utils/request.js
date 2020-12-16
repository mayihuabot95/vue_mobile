// 封装axios请求模块
import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
  // 备用地址：baseURL: 'http://api-toutiao-web.itheima.net/'
})

export default request
