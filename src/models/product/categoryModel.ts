import type { BaseModel } from '../baseModel'

/** 商品分类 */
export declare interface Category extends BaseModel {
  categoryCode?: string
  categoryName?: string
  parentId?: string
  parentName?: string
  categoryImg?: string
  sortNo?: string
  description?: string
  categoryItems?: Category[]
}
