import { BaseModel } from "../baseModel";

/** 商品规格 */
export declare interface Attribute extends BaseModel{
  attributeCode?: string
  attributeName?: string
  description?: string
  attributeItems?: AttributeItem[]
} 

/** 商品规格属性值 */
export declare interface AttributeItem extends BaseModel {
  attributeId: string
  value: string
  sortNo?: number
}