import type { Menu, MenuTree } from '~/models/sys/menuModel'
import type { Tree } from '~/models/common/treeModel'
import { useRequest } from '~/hooks'

const { get, post, put, patch, del } = useRequest()

/**
 * 创建菜单
 * @param data 菜单
 * @returns
 */
export const createMenu = (data: Menu) => {
  return post<any>('sys/menu', data)
}

/**
 * 更新菜单
 * @param data 菜单
 * @returns
 */
export const updateMenu = (data: Menu) => {
  return put<any>('sys/menu', data)
}

/**
 * 查询菜单
 * @param id 菜单Id
 * @returns 菜单
 */
export const getMenu = (id: string) => {
  return get<Menu>(`sys/menu/${id}`)
}

/**
 * 查询菜单树型列表
 * @param type 查询类型
 * @returns 菜单树型列表
 */
export const getMenuTreeList = (type: number | string = '') => {
  return get<MenuTree>(`sys/menu/tree/${type}`)
}

/**
 * 查询角色菜单树型列表
 * @param roleId 角色Id
 * @returns 菜单树型列表
 */
export const getRoleMenuTreeList = (roleId: string) => {
  return get<Tree>(`sys/menu/${roleId}/tree`)
}

/**
 * 删除菜单
 * @param ids 菜单Id集合
 * @returns
 */
export const delMenu = (ids: string) => {
  return del<any>(`sys/menu/${ids}`)
}

/**
 * 启用/禁用菜单
 * @param id 菜单Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableMenu = (id: string, enable: boolean) => {
  return patch<any>(`sys/menu/${id}/${enable ? 'enable' : 'disable'}`)
}
