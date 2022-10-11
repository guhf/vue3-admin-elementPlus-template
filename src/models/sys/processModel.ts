import { BaseModel } from '../baseModel'

export declare interface Process extends BaseModel {
  menuCode?: string
  menuName?: string
  menuType?: number
  path?: string
  parentId?: string
  apiUrl?: string
  authority?: string
  icon?: string
  component?: string
  sortNo?: number
}