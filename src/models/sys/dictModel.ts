import { BaseModel } from '../baseModel'
import { Options } from '@/models/common/optionModel'

export declare interface Dict extends BaseModel {
  dictCode?: string
  dictName?: string
  dictType?: number
  sortNo?: number
  remark?: string
  dictItems?: DictItem[]
}

export declare interface DictItem extends BaseModel {
  dictId: string
  ditcItemName: string
  dictItemValue: string
  sortNo?: number
  remark?: string
}

export declare interface DictData {
  dictCode: string
  dictName: string
  dictItems: Options
}