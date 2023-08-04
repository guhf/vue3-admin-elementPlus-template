import type { BaseModel } from '../baseModel'

/**
 * 消息
 */
export interface Message extends BaseModel {
  /** 消息类型 */
  messageType: number
  /** 消息编号 */
  code?: string
  /** 消息标题 */
  title: string
  /** 消息内容 */
  content: string
  /** 跳转连接 */
  link?: string
  /** 发送人 */
  senderName: string
  /** 接收人 */
  receiverName: string
  /** 是否已读 */
  isRead: string
  /** 发送时间 */
  sendTime: string
}

/**
 * 实时消息通知
 */
export interface Notify {
  messageType: NotifyType
  title: string
  content: string
}

/**
 * 消息通知类型
 */
export enum NotifyType {
  /** 成功 */
  success = 1,
  /** 提醒 */
  warning = 2,
  /** 信息 */
  info = 3,
}
