import { BaseModel } from "../baseModel";

/** 商品规格模板 */
export declare interface AttrTemplate extends BaseModel{
  attrTemplateCode?: string
  attrTemplateName?: string
  sortNo?: string
  description?: string
  attrTemplateItems?: AttrTemplateItem[]
} 

/** 商品规格模板明细 */
export declare interface AttrTemplateItem extends BaseModel {
  attrTemplateId: string
  attrTemplateItemName: string
  attrTemplateItemValue: string
  sortNo?: number
}