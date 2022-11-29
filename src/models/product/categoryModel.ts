import { BaseModel } from "../baseModel";

/** 商品分类 */
export declare interface Category extends BaseModel{
  categoryCode?: string
  categoryName?: string
  parentId?: string
  parentName?: string
  categoryPicture?: string
  sortNo?: string
  description?: string
  categoryItems?: Category[]
} 