import { ElMessage } from 'element-plus'
import { router } from '@/router'
import { useTagsViewStore } from '@/store/tagsView'

interface routerOptions{
  path?: string
  msg?: string
  query?: Record<string, string | number | []>
  params?: any
}

/**
 * 路由跳转
 * @param options 路由参数
 */
export const useRouterPush = (options: routerOptions = {}) => {
  return router.push(options)
}

/**
 * 路由替换
 * @param options 路由参数
 */
export const useRouterReplace = (options: routerOptions = {}) => {
  return router.replace(options)
}

/**
 * 路由跳转-添加
 * @param options 路由参数
 */
export const useRouterCreate = (options: routerOptions = {}) => {
  let currentPath = router.currentRoute.value.fullPath
  options.path = `${currentPath}/create`

  return useRouterPush(options)
}

/**
 * 路由跳转-查看
 * @param options 路由参数
 */
export const useRouterShow = (options: routerOptions = {}) => {
  let currentPath = router.currentRoute.value.fullPath
  options.path = `${currentPath}/show/${options.path}`

  return useRouterPush(options)
}

/**
 * 路由跳转-编辑
 * @param options 路由参数
 */
export const useRouterUpdate = (options: routerOptions = {}) => {
  let currentPath = router.currentRoute.value.fullPath
  options.path = currentPath.replace('show', 'update')

  return useRouterPush(options)
}

/**
 * 路由跳转-返回列表页
 * @param options 路由参数
 */
export const useRouterBackIndex = (options: routerOptions = {}) => {
  let currentPath = router.currentRoute.value.fullPath
  options.path = options.path || currentPath.substring(0, currentPath.lastIndexOf('/'))
  options.path = currentPath.indexOf('/create') > -1 ? options.path : options.path.substring(0, options.path.lastIndexOf('/'))

  //replace(/([A-Z])/g,"/$1")
  // 返回到index页面时清除掉其他页面缓存
  useTagsViewStore().delCachedView(options.path.replaceAll('/', ''))

  return useRouterPush(options).then(() => {
    // 有缓存，需要跳转后清除
    // options.path = ''
    if (options.msg) { ElMessage.success(options.msg) }
  })
}
