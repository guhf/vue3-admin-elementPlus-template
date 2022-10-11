import { BaseModel } from '../baseModel'

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

export interface UserRole {
  roleId: string
  roleName: string
  isAdmin?: boolean
  isSuper?: boolean
}

