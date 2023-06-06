import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routeWhiteList from './config/whitelist/route'
import type { RouteLocationNormalized } from 'vue-router'
import router from '~/router'
import { useUserStore } from '~/store/user'
import { usePermissionStore } from '~/store/permission'
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  NProgress.start()
  document.title = '管理系统' // to.meta.title

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (permissionStore.routes.length === 0) {
        await userStore.getUserInfo()
        await userStore.getMenuList()

        if (permissionStore.routes.length === 0) {
          // TODO 没有权限跳转至无权限页面
          next({ path: '/403', replace: true })
        } else {
          next({ ...to, replace: true })
        }
        NProgress.done()
      } else {
        next()
      }
    }
  } else {
    if (routeWhiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
