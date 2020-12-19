import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由列表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    // ***注意：如果父路由有默认的子路由，那它的 name 属性没有意义
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        // 路径为空，代表它是默认被渲染的子路由，默认的子路由只能有一个！
        name: 'homeIndex',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qaIndex',
        component: () => import('@/views/Q&A')
      },
      {
        path: '/video',
        // 路径为空，代表它是默认被渲染的子路由
        name: 'videoIndex',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        // 路径为空，代表它是默认被渲染的子路由
        name: 'myIndex',
        component: () => import('@/views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
