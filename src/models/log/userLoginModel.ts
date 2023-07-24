import type { BaseModel } from '../baseModel'

export declare interface userLogin extends BaseModel {
  accountName?: string
  userName?: string
  ip?: string
  os?: string
  browser?: string
  browserUA?: string
  loginDesc?: string
  loginDateTime?: Date
  loginType?: number
}
