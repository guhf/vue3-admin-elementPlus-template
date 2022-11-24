import { BaseModel } from '../baseModel'

/** 流程 */
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