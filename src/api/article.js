/**
 * 文章相关的请求模块
 */

import request from '@/utils/request'

// 按需导出 获取文章列表数据 的请求
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    // params 用来传递 查询参数
    // params: params
    params
  })
}
