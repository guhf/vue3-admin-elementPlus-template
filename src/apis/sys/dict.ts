import http from '@/utils/http'
import { Dict, DictItem } from '@/models/sys/dictModel'

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
 * 查询数据字典树状列表
 * @returns 数据字典树状列表
 */
export const getDictTreeList = () => {
  return http.get<Dict[]>('sys/dict/tree')
}

/**
 * 查询数据字典数据选项列表
 * @returns 数据字典选项列表
 */
export const getDictItemList = () => {
  return http.get<DictItem[]>('sys/dict/tree/items')
}

/**
 * 删除数据字典
 * @param ids 数据字典Id集合
 * @returns
 */
export const delDict = (ids: string) => {
  return http.delete<any>(`sys/dict/${ids}`)
}

/**
 * 删除数据字典选项
 * @param ids 数据字典选项Id集合
 * @returns
 */
export const delDictItem = (ids: string) => {
  return http.delete<any>(`sys/dict/item/${ids}`)
}