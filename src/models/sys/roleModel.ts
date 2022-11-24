import { BaseModel } from '../baseModel'

/** 角色 */
export declare interface Role extends BaseModel {
  roleCode?: string
  roleName?: string
  roleType?: number
  isAdmin?: boolean
  isSuper?: boolean
  description?: string
}

