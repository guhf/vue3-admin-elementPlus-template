import type { Message } from '~/models/common/messageModel'
import { useRequest } from '~/hooks'
const { get, patch, del } = useRequest()

/**
 * 查询未读消息列表
 * @param cond 查询条件
 * @returns 消息列表
 */
export const getUnReadMessageList = (cond: any) => {
  return get<any>('user/message/unread', cond)
}

/**
 * 查询消息分页列表
 * @param cond 查询条件
 * @returns 消息列表
 */
export const getMessagePageList = (cond: any) => {
  return get<any>('user/message', cond)
}

/**
 * 查询数据字典
 * @param id 数据字典Id
 * @returns 数据字典
 */
export const getMessage = (id: string) => {
  return get<Message>(`user/message/${id}`)
}

/**
 * 设置全部消息为已读状态
 * @returns
 */
export const updateAllFlag = () => {
  return patch<any>('user/message/allread')
}

/**
 * 设置批量消息为已读状态
 * @param ids 消息Id集合
 * @returns
 */
export const updateFlag = (ids: string[]) => {
  return patch<any>(`user/message/read`, { ids })
}

/**
 * 删除消息
 * @param ids 消息Id集合
 * @returns
 */
export const delMessage = (ids: string[]) => {
  return del<any>(`user/message`, { ids })
}
