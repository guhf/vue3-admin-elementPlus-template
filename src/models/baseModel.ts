import type { attachModel } from './common/attachModel'

export declare interface BaseModel {
  id: string
  status?: boolean
  version?: number
  attachs?: attachModel[]
}
