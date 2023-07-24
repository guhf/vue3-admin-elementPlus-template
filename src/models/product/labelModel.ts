import type { BaseModel } from '../baseModel'

/** 商品标签 */
export declare interface Label extends BaseModel {
  labelCode?: string
  labelName?: string
  sortNo?: string
  description?: string
}
