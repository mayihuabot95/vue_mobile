import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 加载注册 Vant 组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载执行 lib-flexible 模块，用于动态设置 rem 基准值
import 'amfe-flexible'

// 加载 dayjs 初始化配置
import './utils/dayjs'

// 阻止在控制台中显示生产模式的消息
Vue.config.productionTip = false

Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
