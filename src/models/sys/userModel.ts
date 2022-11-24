import { BaseModel } from '../baseModel'

/** 用户 */
export declare interface User extends BaseModel {
  userCode?: string
  userName?: string
  accountName?: string
  sex?: number
  phone?: string
  birthday?: Date
  roleIds: string[]
  userRoles?: UserRole[]
}

/** 用户角色 */
export declare interface UserRole {
  roleId: string
  roleName: string
  isAdmin?: boolean
  isSuper?: boolean
}

