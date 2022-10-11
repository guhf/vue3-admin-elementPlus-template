import http from '@/utils/http'
import { MenuTree, Menu, PermissionTree } from '@/models/sys/menuModel'

/**
 * 创建菜单
 * @param data 菜单
 * @returns
 */
export const createMenu = (data: Menu) => {
  return http.post<any>('sys/menu', data)
}

/**
 * 更新菜单
 * @param data 菜单
 * @returns
 */
export const updateMenu = (data: Menu) => {
  return http.put<any>('sys/menu', data)
}

/**
 * 查询菜单
 * @param id 菜单Id
 * @returns 菜单
 */
export const getMenu = (id : string) => {
  return http.get<Menu>(`sys/menu/${id}`)
}

/**
 * 查询菜单树状列表
 * @param type 查询类型
 * @returns 菜单树状列表
 */
export const getMenuTreeList = (type = 0) => {
  return http.get<MenuTree>(`sys/menu/tree${type}`)
}

/**
 * 查询角色菜单树状列表
 * @param roleId 角色Id
 * @returns 菜单树状列表
 */
export const getRoleMenuTreeList = (roleId: string) => {
  return http.get<PermissionTree>(`sys/menu/${roleId}/tree`)
}

/**
 * 删除菜单
 * @param ids 菜单Id集合
 * @returns
 */
export const delMenu = (ids: string) => {
  return http.delete<any>('sys/menu/' + ids)
}

/**
 * 启用/禁用菜单
 * @param id 菜单Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableMenu = (id: string, enable: boolean) => {
  return http.patch<any>(`sys/menu/${id}/${ enable ? 'enable': 'disable' }`)
}

/**
 * 禁用菜单
 * @param id 菜单Id
 * @returns
 */
export const disableMenu = (id: string) => {
  return http.patch<any>(`sys/menu/${id}/disable`)
}
