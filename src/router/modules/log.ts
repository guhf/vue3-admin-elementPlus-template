import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '@/router/const'

const logRouter: Array<RouteRecordRaw> = [
  {
    path: '/log',
    component: LAYOUT,
    name: 'Log',
    // redirect: '/log/directive', //面包屑跳转路由
    meta: {
      title: '日志管理',
      icon: '#iconquanxian',
      alwaysShow: true
    },
    children: [
      {
        path: 'userlogin/index',
        component: () => import('@/views/log/userlogin/index.vue'),
        name: 'logUserLogin',
        meta: {
          tagName: 'logUserLogin',
          title: '用户登录日志',
          icon: '#iconquanxian'
        }
      },
      {
        path: 'userlogin/show',
        component: () => import('@/views/log/userlogin/show.vue'),
        name: 'logUserLoginShow',
        meta: {
          tagName: 'logUserLogin',
          title: '用户登录日志',
          activeMenu: '/log/userlogin/index',
          hidden: true
        }
      }

    ]
  }
]
export default logRouter
