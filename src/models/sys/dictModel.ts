import { BaseModel } from '../baseModel'
import { Options } from '@/models/common/optionModel'

/** 字典 */
export declare interface Dict extends BaseModel {
  dictCode?: string
  dictName?: string
  dictType?: number
  sortNo?: number
  remark?: string
  dictItems?: DictItem[]
}

/** 字典明细 */
export declare interface DictItem extends BaseModel {
  dictId: string
  ditcItemName: string
  dictItemValue: string
  sortNo?: number
  remark?: string
}

/** 全部字典数据 */
export declare interface DictData {
  dictCode: string
  dictName: string
  dictItems: Options
}