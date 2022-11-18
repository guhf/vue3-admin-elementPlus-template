import { BaseModel } from '../baseModel'

export declare interface Dict extends BaseModel {
  dictCode?: string
  dictName?: string
  dictType?: number
  sortNo?: number
  remark?: string
  dictItem?: DictItem[]
}

export declare interface DictItem extends BaseModel {
  dictId: string
  ditcItemName: string
  dictItemValue: string
  sortNo?: number
  remark?: string
}