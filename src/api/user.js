/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// import store from '@/store'

// 按需导出 用户登录 的请求模块
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 按需导出 获取短信验证码 的请求模块
// 注意：接口访问次数受限，每手机号每分钟1次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 按需导出 获取用户自己信息 的请求模块
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
    // ***注意：请求头中的 Content-Type 在 axios 发送请求时已经自动设置好了
    /* headers: {
      Authorization: `Bearer ${store.state.user.token}`
    } */
  })
}
