import { BaseModel } from "../baseModel";

/** 商品品牌 */
export declare interface Brand extends BaseModel{
  brandCode?: string
  brandName?: string
  brandLogo?: string
  sortNo?: string
  description?: string
}