import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import userRoutes from './modules/user'
import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '~/router/const'

export const mainRoutes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: LAYOUT,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('~/views/redirect/index.vue'),
        meta: {
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: LAYOUT,
    redirect: '/dashboard',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('~/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '工作台',
          icon: 'icon-gongzuotai',
          menuType: 2,
          affix: true,
        },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('~/views/user/login/index.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/403',
    component: () => import('~/views/error/403.vue'),
    name: '403',
    meta: {
      tagName: '403',
      title: '403',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('~/views/error/404.vue'),
    name: '404',
    meta: {
      hidden: true,
    },
  },
  // 必须放在最后，否则页面不存在不会跳转到404
  // { path: '/:pathMatch(.*)*', redirect: '/404',
  //   meta: {
  //     hidden: true
  //   }
  // }
]

export const constantRoutes: RouteRecordRaw[] = [...mainRoutes, ...userRoutes]

// app router
export const router = createRouter({
  history: createWebHistory('/'),
  routes: constantRoutes,
})

// reset router
export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher
}

export default router
