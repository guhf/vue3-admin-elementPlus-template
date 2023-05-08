import { defineStore } from 'pinia'
import router, { constantRoutes } from '~/router'
import { Route, Routes } from '~/models/route/routesModel'
import lodash from 'lodash'

const modules = import.meta.glob('../views/**/*.vue')

export const usePermissionStore = defineStore('permissionStore', {
  state: () => {
    return {
      routes: [] as Routes,
      menus: [] as Routes,
      dynamicRoutes: [] as Routes,
      auths: [] as any[]
    }
  },
  actions: {
    async setRoutes(routes: Routes) {
      this.menus = []
      this.auths = []
      this.routes = [...routes, ...constantRoutes] as Routes
      this.dynamicRoutes = routes

      await routerRegister(routes, '')
      
      // this.menus = [{
      //   id: '',
      //   name: 'Dashboard',
      //   path: '/dashboard',
      //   component: 'dashboard/index.vue',
      //   meta: {
      //     title: '首页',
      //     tagName: '首页',
      //     icon: 'icon-shouye'
      //   },
      //   menuType: 2,
      //   authority: '', // 权限码
      // }, ...await traverseMenu(this.menus)]
      this.menus = await traverseMenu(this.menus)

      // 最后注册404路由,否则刷新页面会直接到空白页/404页面
      if (!router.hasRoute('404')) {
        router.addRoute({
          path: '/:catchAll(.*)',
          name: '404',
          component: () => import('../views/error/404.vue')
        })
      }
    }
  }
})

const traverseMenu = (menus: Routes) => {
  let menuTree: Routes = []
  let map: Map<string, Route> = new Map()
  menus.forEach((menu: Route) => {
    map.set(menu.id, menu)
  })

  menus.forEach((menu: Route) => {
    menu.path = `/${menu.path}`
    let parent = map.get(menu.parentId || '')
    if(parent){
      if(!parent.children){
        parent.children = []
      }
      parent.children.push(menu)
    }else{
      menuTree.push(menu)
    }
  })
  return menuTree
}

/**
 * 动态注册路由
 * @param routes 动态路由集合
 * @param name 路由上级名称
 */
const routerRegister = (routes: Routes, name: string) => {
  routes.forEach((route: Route) => {
    if(route.menuType !== 3){
      const menu = lodash.cloneDeep(route)
      menu.children = []
      usePermissionStore().menus.push(menu)
    }
    
    if (route.component) {
      if (route.component === 'Layout') {
        name = route.name
        router.addRoute({
          name: route.name,
          path: `/${route.path}`,
          component: () => import('../layout/index.vue'),
          meta: route.meta ? {
            title: route.meta.title || '',
            icon: route.meta.icon,
            alwaysShow: route.meta.alwaysShow
          } : route.meta
        })
      } else {
        if (route.component !== 'Layout') {
          router.addRoute(name, {
            name: route.name,
            path: `/${route.path}`,
            component: modules[`../views/${route.component}`],
            meta: route.meta ? {
              title: route.meta.title || '',
              tagName: route.meta.tagName,
              icon: route.meta.icon,
              activeMenu: route.meta.activeMenu ? `/${route.meta.activeMenu}` : '',
              hidden: route.meta.hidden
            } : route.meta
          })
        }
      }
    }
    if(route.authority){
      usePermissionStore().auths.push(route.authority)
    }

    if (route.children && route.children.length) {
      routerRegister(route.children, name)
    }
  })
}

