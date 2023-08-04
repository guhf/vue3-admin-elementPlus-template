import type { attachModel } from './common/attachModel'

export declare interface BaseModel {
  /** Id */
  id: string
  /** 状态 */
  status?: boolean
  /** 乐观锁 */
  version?: number
  /** 附件 */
  attachs?: attachModel[]
}
