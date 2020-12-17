/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'

// 按需导出用户登录的请求模块
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 按需导出获取短信验证码的请求模块
// 注意：接口访问次数受限，每手机号每分钟1次
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
