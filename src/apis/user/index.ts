import type { Routes } from '~/models/route/routesModel'
import type { LoginInfo, Token, UserInfo } from '~/models/userModel'
import { useRequest } from '~/hooks'

const { get, post, put } = useRequest()

/**
 * 登录
 * @param loginInfo 用户信息
 * @returns
 */
export const login = (loginInfo: LoginInfo) => {
  return post<Token>('login/login', loginInfo)
}

/**
 * 刷新token
 * @returns
 */
export const refreshAccessToken = (refreshToken: string) => {
  return post<Token>('login/refresh', { refreshToken })
}

/**
 * 当前登录用户信息
 * @returns
 */
export const getOnlineInfo = () => {
  return get<UserInfo>('sys/user/online')
}

/**
 * 查询登录用户有权限菜单列表
 * @returns 菜单树型列表
 */
export const getMenuList = () => {
  // TODO 修改接口地址，后端修改成 user/menu，并分解出UserController
  return get<Routes>(`sys/menu/current/auth`)
}

/**
 * 修改基本信息
 * @param data 用户信息
 * @returns
 */
export const updateInfo = (data: UserInfo) => {
  return put<object>('sys/user/info/update', data)
}

/**
 * 修改密码
 * @param data 密码信息
 * @returns
 */
export const updatePwd = (data: { oldPwd: string; pwd: string }) => {
  return put<object>('sys/user/pwd/update', data)
}
