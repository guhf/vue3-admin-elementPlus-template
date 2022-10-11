import { BaseModel } from "./baseModel"

export interface LoginInfo {
  username: string
  password: string
}

export interface Token{
  accessToken: string
}

export interface UserRole {
  roleName: string
  isAdmin?: boolean
  isSuper?: boolean
}

export interface UserInfo extends BaseModel {
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
