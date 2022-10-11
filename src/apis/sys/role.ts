import http from '@/utils/http'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Role } from '@/models/sys/roleModel'
import { SelectOptions } from '@/models/common/selectModel'

/**
 * 创建角色
 * @param data 角色
 * @returns
 */
export const createRole = (data: Role) => {
  return http.post<any>('sys/role', data)
}

/**
 * 更新角色
 * @param data 角色
 * @returns
 */
export const updateRole = (data: Role) => {
  return http.put<any>('sys/role', data)
}

/**
 * 查询角色
 * @param id 角色Id
 * @returns 角色
 */
export const getRole = (id : string) => {
  return http.get<Role>(`sys/role/${id}`)
}

/**
 * 查询角色列表
 * @param cond 查询条件
 * @returns 角色列表
 */
export const getRolePageList = (cond: PageQuery) => {
  return http.get<Role[]>('sys/role/page', cond)
}

/**
 * 查询角色下拉框列表
 * @param cond 查询条件
 * @returns 角色下拉框列表
 */
export const getRoleSelectList = () => {
  return http.get<SelectOptions>('sys/role/selectlist')
}

/**
 * 删除角色
 * @param ids 角色Id集合
 * @returns
 */
export const delRole = (ids: string) => {
  return http.delete<any>('sys/role/' + ids)
}

/**
 * 为角色分配权限
 * @param id 角色Id
 * @param menuIds 菜单Id集合
 * @returns
 */
export const setAuth = (id: string, menuIds: string[]) => {
  return http.post<any>(`sys/role/${id}/setauth`, menuIds)
}
