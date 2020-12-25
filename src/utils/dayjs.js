import dayjs from 'dayjs'
import Vue from 'vue'

// 按需导入处理 相对时间的插件 relativeTime
import relativeTime from 'dayjs/plugin/relativeTime'

// 加载 中文语言包
import 'dayjs/locale/zh-cn'
// 将 中文语言包 配置给全局使用
dayjs.locale('zh-cn')

// 用法示例：
// 使用 dayjs() 获取当前最新的时间，dayjs().format() 第二个括号中自定义需要的时间格式
// console.log(dayjs().format('YYYY/MM/DD'))

// 配置使用 relativeTime 插件
dayjs.extend(relativeTime)

// 定义一个全局的 处理时间格式的 过滤器，然后就可以在任何组件的模板中使用了
// ***其实过滤器就相当于一个全局可用的方法(仅供模板使用)
// 这个方法中的第一个参数是 过滤器的名称，第二个参数就是 过滤器函数
Vue.filter('relativeTime', value => {
  // console.log(value)
  // {{ 表达式 | 过滤器名称 }} 中的 管道符前面的表达式结果 会作为参数传递到过滤器函数中
  return dayjs().to(dayjs(value))
})
