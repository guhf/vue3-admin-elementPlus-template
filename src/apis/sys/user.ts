import type { PageQuery } from '~/models/common/pageQueryModel'
import type { User } from '~/models/sys/userModel'
import { useRequest } from '~/hooks'

const { get, post, put, del } = useRequest()

/**
 * 创建用户
 * @param data 用户
 * @returns
 */
export const createUser = (data: User) => {
  return post<any>('sys/user', data)
}

/**
 * 更新用户
 * @param data 用户
 * @returns
 */
export const updateUser = (data: User) => {
  return put<any>('sys/user', data)
}

/**
 * 查询用户
 * @param id 用户Id
 * @returns 用户
 */
export const getUser = (id: string) => {
  return get<User>(`sys/user/${id}`)
}

/**
 * 查询用户列表
 * @param cond 查询条件
 * @returns 用户列表
 */
export const getUserPageList = (cond: PageQuery) => {
  return get<User[]>('sys/user/page', cond)
}

/**
 * 查询用户下拉框列表
 * @param cond 查询条件
 * @returns 用户列表
 */
export const getUserSelectList = (cond: PageQuery) => {
  return get<User[]>('sys/user/selectlist', cond)
}

/**
 * 删除用户
 * @param ids 用户Id集合
 * @returns
 */
export const delUser = (ids: string[]) => {
  return del<any>(`sys/user`, ids)
}

/**
 * 重置密码
 * @param id 用户Id
 * @returns
 */
export const resetPwd = (id: string) => {
  return put<any>(`sys/user/${id}/pwd/reset`)
}
