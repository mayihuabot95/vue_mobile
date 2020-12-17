/**
 * 优化本地存储的操作，并将其封装为模块
 */

// 按需导出 setItem 模块，用于存储 token
export const setItem = (key, value) => {
  // 判断数据类型，将数组/对象格式的数据转换为JSON的字符串，再进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
    window.localStorage.setItem(key, value)
  }
}

// 按需导出 getItem 模块，用于获取 token
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    // *** JSON.parse(string) 只能接受 JSON 字符串
    // 如果从 localStorage 中取出的 data 本身就是 JSON格式的字符串 ，则它可以被转换为JSON对象格式，然后再返回
    return JSON.parse(data)
  } catch (error) {
    // 如果从 localStorage 中取出的 data 不是 JSON对象格式 的，则直接返回
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
