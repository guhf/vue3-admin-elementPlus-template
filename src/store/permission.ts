import { defineStore } from 'pinia'
import lodash from 'lodash'
import type { RouteRecordRaw } from 'vue-router'
import type { Route, Routes } from '~/models/route/routesModel'
import router, { constantRoutes } from '~/router'

const modules = import.meta.glob('../views/**/*.vue')

export const usePermissionStore = defineStore('permissionStore', {
  state: () => {
    return {
      routes: [] as Routes,
      menus: [] as Routes,
      dynamicRoutes: [] as Routes,
      auths: [] as any[],
    }
  },
  actions: {
    async setRoutes(routes: Routes) {
      this.auths = []
      this.menus = [...constantRoutes, ...routes] as Routes
      this.routes = [...constantRoutes, ...routes] as Routes
      this.dynamicRoutes = routes

      await traverseConstRoutes(constantRoutes, '')
      await dynamicRegisterRouter(routes, '')
      // 最后注册404路由,否则刷新页面会直接到空白页/404页面
      router.addRoute({
        path: '/:catchAll(.*)',
        redirect: '/404',
        meta: { hidden: true },
      })

      this.menus = this.menus.sort((a, b) => a.meta.sortNo - b.meta.sortNo)
    },
  },
})

/**
 * 动态注册路由
 * @param routes 动态路由集合
 * @param name 路由上级名称
 */
const dynamicRegisterRouter = (routes: Routes, name: string) => {
  routes.forEach((route: Route) => {
    // if (route.meta.menuType === 3) {
    //   return
    // }

    if (route.component) {
      if (route.component === 'Layout') {
        name = route.name
        router.addRoute({
          name: route.name,
          path: `${route.path}`,
          component: () => import('../layout/index.vue'),
          meta: route.meta
            ? {
                title: route.meta.title || '',
                icon: route.meta.icon,
                alwaysShow: route.meta.alwaysShow,
              }
            : route.meta,
        })
      } else {
        if (route.component !== 'Layout') {
          router.addRoute(name, {
            name: route.name,
            path: `${route.path}`,
            component: modules[`../views/${route.component}`],
            meta: route.meta
              ? {
                  title: route.meta.title || '',
                  tagName: route.meta.tagName,
                  icon: route.meta.icon,
                  activeMenu: route.meta.activeMenu ? `/${route.meta.activeMenu}` : '',
                  hidden: route.meta.hidden,
                }
              : route.meta,
          })
        }
      }
    }
    if (route.authority) {
      usePermissionStore().auths.push(route.authority)
    }

    if (route.children && route.children.length) {
      dynamicRegisterRouter(route.children, name)
    }
  })
}

/**
 * 遍历静态路由取出菜单
 * @param routes 静态路由集合
 * @param name 路由上级名称
 */
const traverseConstRoutes = (routes: RouteRecordRaw[], name: string) => {
  routes.forEach((route: RouteRecordRaw) => {
    if (!route.meta || !route.meta.hidden) {
      const menu = lodash.cloneDeep(route)
      menu.children = []
      usePermissionStore().menus.push(menu as unknown as Route)
    }

    if (route.children && route.children.length) {
      traverseConstRoutes(route.children, name)
    }
  })
}
