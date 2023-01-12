import { BaseModel } from "../baseModel";

/** 商品品牌 */
export declare interface Brand extends BaseModel{
  brandCode?: string
  brandName?: string
  brandPicture?: string
  sortNo?: string
  description?: string
}