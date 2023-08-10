import type { PageQuery } from '~/models/common/pageQueryModel'
import type { Role } from '~/models/sys/roleModel'
import type { Options } from '~/models/common/optionModel'
import { useRequest } from '~/hooks'
const { get, post, put, del } = useRequest()

/**
 * 创建角色
 * @param data 角色
 * @returns
 */
export const createRole = (data: Role) => {
  return post<any>('sys/role', data)
}

/**
 * 更新角色
 * @param data 角色
 * @returns
 */
export const updateRole = (data: Role) => {
  return put<any>('sys/role', data)
}

/**
 * 查询角色
 * @param id 角色Id
 * @returns 角色
 */
export const getRole = (id: string) => {
  return get<Role>(`sys/role/${id}`)
}

/**
 * 查询角色列表
 * @param cond 查询条件
 * @returns 角色列表
 */
export const getRolePageList = (cond: PageQuery) => {
  return get<Role[]>('sys/role/page', cond)
}

/**
 * 查询角色下拉框列表
 * @param cond 查询条件
 * @returns 角色下拉框列表
 */
export const getRoleSelectList = () => {
  return get<Options>('sys/role/selectlist')
}

/**
 * 删除角色
 * @param ids 角色Id集合
 * @returns
 */
export const delRole = (ids: string[]) => {
  return del<any>(`sys/role`, ids)
}

/**
 * 为角色分配权限
 * @param id 角色Id
 * @param menuIds 菜单Id集合
 * @returns
 */
export const setAuth = (id: string, menuIds: string[]) => {
  return post<any>(`sys/role/${id}/auth`, menuIds)
}
