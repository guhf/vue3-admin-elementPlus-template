import { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '~/router/const'

const userRoutes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    component: LAYOUT,
    name: 'User',
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/user/message/',
        component: () => import('~/views/user/message/index.vue'),
        name: 'UserMessage',
        meta: {
          tagName: 'UserMessage',
          title: '通知列表',
          hidden: true
        }
      },
      {
        path: '/user/message/show/:id',
        component: () => import('~/views/user/message/show.vue'),
        name: 'UserMessageShow',
        meta: {
          tagName: 'UserMessage',
          title: '通知列表',
          hidden: true
        }
      },
      {
        path: '/user/info/',
        component: () => import('~/views/user/info/index.vue'),
        name: 'UserInfo',
        meta: {
          tagName: 'UserInfo',
          title: '用户中心',
          hidden: true
        }
      }
    ]
  }
]
export default userRoutes
