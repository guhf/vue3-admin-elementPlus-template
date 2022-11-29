import { Routes } from '@/models/route/routesModel'
import { LoginInfo, Token, UserInfo } from '@/models/userModel'
import http from '@/utils/http'

/**
 * 登录
 * @param loginInfo 用户信息
 * @returns
 */
export const login = (loginInfo: LoginInfo) => {
  return http.post<Token>('sys/user/login', loginInfo)
}

/**
* 当前登录用户信息
* @returns
*/
export const getOnlineInfo = () => {
  return http.get<UserInfo>('sys/user/online')
}

/**
 * 查询登录用户有权限菜单列表
 * @returns 菜单树型列表
 */
export const getMenuList = () => {
  // TODO 修改接口地址，后端修改成 user/menu，并分解出UserController
  return http.get<Routes>(`sys/menu/current/auth`)
}

/**
* 修改基本信息
 * @param data 用户信息
* @returns
*/
export const updateInfo = (data: UserInfo) => {
  return http.put<object>('sys/user/info/update', data)
}

/**
* 修改密码
 * @param data 密码信息
* @returns
*/
export const updatePwd = (data: { oldPwd: string, pwd: string}) => {
  return http.put<object>('sys/user/pwd/update', data)
}
