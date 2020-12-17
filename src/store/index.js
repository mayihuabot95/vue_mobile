import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage.js'

Vue.use(Vuex)

// ***注意：将设置 token 所用的属性名设置为常量，而不是字符串，更便于使用(写错了容易被发现)
const tokenKeys = 'toutiao_user'

export default new Vuex.Store({
  state: {
    // 用来存储 当前已登录的 用户信息数据 的一个对象
    // user: null
    // 刷新页面后，从 localStorage 中可以取出 token，并再次放入 Vuex 中
    user: getItem(tokenKeys)
  },
  mutations: {
    setUser (state, data) {
      // ******为了便于 双向绑定数据，将 token 存入 Vuex 的数据中
      state.user = data
      // ****** 为了 token 的持久性，将 token 存入 localStorage 中
      // ***注意：localStorage 中只能保存字符串格式的数据，因此要通过 JSON.stringify 方法转换 token 的格式
      setItem(tokenKeys, data)
    }
  },
  actions: {
  },
  modules: {
  }
})
