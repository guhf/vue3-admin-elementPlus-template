import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'
import { ElMessage } from 'element-plus'
import routeWhiteList from './config/whitelist/route'
NProgress.configure({ showSpinner: false })

router.beforeEach(async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => {
  NProgress.start()
  document.title = '管理系统'// to.meta.title

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  console.log(5555, (new Date()).toLocaleString(), new Date().getMilliseconds());

  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (permissionStore.routes.length === 0) {
        try {
          await userStore.getUserInfo()
          await userStore.getMenuList()

          if (permissionStore.routes.length === 0) {
            // TODO 没有权限跳转至无权限页面
            next({ path: '/403', replace: true })
          } else {
            next({ ...to, replace: true })
          }
        } catch (err) {
          userStore.removeToken()
          ElMessage.error(err as string || 'Has Error')
          NProgress.done()
        }
      } else {
        console.log(6666, (new Date()).toLocaleString(), new Date().getMilliseconds());
        next()
      }
    }
  } else {
    if (routeWhiteList.indexOf(to.path) !== -1) {
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
