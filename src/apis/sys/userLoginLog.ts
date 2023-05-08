import { useRequest } from '~/hooks'
const { get } = useRequest()

/**
 * 查询用户登录日志
 * @param id 用户登录日志Id
 * @returns 用户登录日志
 */
export const getUserLoginLog = (id : number) => {
  return get<any>(`sys/userloginlog/${id}`)
}

/**
 * 查询用户登录日志列表
 * @param cond 查询条件
 * @returns 用户登录日志列表
 */
export const getUserLoginLogPageList = (cond: any) => {
  return get<any>('sys/userloginlog/page', cond)
}
