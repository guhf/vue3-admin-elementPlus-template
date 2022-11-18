import http from '@/utils/http'
import { Dict, DictItem } from '@/models/sys/dictModel'
import { PageQuery } from '@/models/common/pageQueryModel'
import { User } from '@/models/sys/userModel'

/**
 * 创建数据字典
 * @param data 数据字典
 * @returns
 */
export const createDict = (data: Dict) => {
  return http.post<any>('sys/dict', data)
}

/**
 * 更新数据字典
 * @param data 数据字典
 * @returns
 */
export const updateDict = (data: Dict) => {
  return http.put<any>('sys/dict', data)
}

/**
 * 查询数据字典
 * @param id 数据字典Id
 * @returns 数据字典
 */
export const getDict = (id : string) => {
  return http.get<Dict>(`sys/dict/${id}`)
}

/**
 * 查询数据字典列表
 * @param cond 查询条件
 * @returns 数据字典列表
 */
export const getDictPageList = (cond: PageQuery) => {
  return http.get<User[]>('sys/dict/page', cond)
}

/**
 * 查询数据字典列表
 * @param cond 查询条件
 * @returns 数据字典列表
 */
export const getDictList = (cond: PageQuery) => {
  return http.get<User[]>('sys/dict/list', cond)
}

/**
 * 删除数据字典
 * @param ids 数据字典Id集合
 * @returns
 */
export const delDict = (ids: string) => {
  return http.delete<any>(`sys/dict/${ids}`)
}