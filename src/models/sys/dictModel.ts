import { BaseModel } from '../baseModel'

export declare interface Dict extends BaseModel {
  dicCode?: string
  dicName?: string
  dicType?: number
}

export declare interface DictItem extends BaseModel {
  dicId: string
  dicCode: string
  dicName: string
  dicValue: string
  sortNo?: number
}