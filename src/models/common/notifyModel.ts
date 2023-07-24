/**
 * 通知
 */
export interface Notify {
  notifyType: NotifyType
  title: string
  content: string
}

/**
 * 通知类型
 */
export enum NotifyType {
  /** 成功 */
  success = 1,
  /** 提醒 */
  warning = 2,
  /** 消息 */
  info = 3,
}
