import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '~/router/const'
import userRoutes from './modules/user'

export const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: LAYOUT,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('~/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/',
    component: LAYOUT,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('~/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('~/views/user/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true
    }
  },
  {
    path: '/403',
    component: () => import('~/views/error/403.vue'),
    name: '403',
    meta: {
      tagName: '403',
      title: '403',
      hidden: true
    }
  }
  // {
  //   path: '/404',
  //   component: () => import('~/views/error/404.vue'),
  //   name: '404'
  //   // meta: {
  //   //   tagName: '404',
  //   //   title: '404',
  //   //   hidden: true
  //   // }
  // }
  // // 必须放在最后，否则页面不存在不会跳转到404
  // // { path: '/:pathMatch(.*)*', redirect: '/404',
  // //   meta: {
  // //     hidden: true
  // //   }
  // // }
]

export const constantRoutes: Array<RouteRecordRaw> = [
  ...mainRoutes,
  ...userRoutes
]

// app router
export const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
})

// reset router
export function resetRouter() {
  const newRouter = router;
  (router as any).matcher = (newRouter as any).matcher
}

export default router
