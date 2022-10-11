import http from '@/utils/http'

/**
 * 创建通知
 * @param data 通知
 * @returns
 */
export const createNotify = (data: any) => {
  return http.post<any>('user/notify', data)
}

/**
 * 查询通知分页列表
 * @param cond 查询条件
 * @returns 通知列表
 */
export const getNotifyPageList = (cond: any) => {
  return http.get<any>('user/notify', cond)
}

/**
 * 删除通知
 * @param ids 通知Id集合
 * @returns
 */
export const delNotify = (ids: string) => {
  return http.delete<any>('user/notify/' + ids)
}

/**
 * 查询未读通知列表
 * @param cond 查询条件
 * @returns 通知列表
 */
export const getUnReadNotifyList = (cond: any) => {
  return http.get<any>('user/notify/remind', cond)
}

/**
 * 设置全部通知为已读状态
 * @returns
 */
export const updateAllFlag = () => {
  return http.patch<any>('user/notify/allread')
}

/**
 * 设置单个通知为已读状态
 * @returns
 */
export const updateFlag = (id: number) => {
  return http.patch<any>(`user/notify/${id}/read`)
}
