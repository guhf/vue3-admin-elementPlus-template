import { BaseModel } from "./baseModel"

/** 登录信息 */
export declare interface LoginInfo {
  username: string
  password: string
}

/** 用户Token */
export declare interface Token{
  accessToken: string
}

/** 用户角色 */
export declare interface UserRole {
  roleName: string
  isAdmin?: boolean
  isSuper?: boolean
}

/** 用户信息 */
export declare interface UserInfo extends BaseModel {
  userCode?: string
  userName?: string
  accountName?: string
  password?: string
  name?: string
  avatar?: string
  introduction?: string
  email?: string
  phone?: string
  sex?: number
  birthday?: Date
  userRoles?: UserRole[]
}
