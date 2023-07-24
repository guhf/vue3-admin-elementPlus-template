import type { Dict, DictData } from '~/models/sys/dictModel'
import type { PageQuery } from '~/models/common/pageQueryModel'
import { useRequest } from '~/hooks'

const { get, post, put, del } = useRequest()

/**
 * 创建数据字典
 * @param data 数据字典
 * @returns
 */
export const createDict = (data: Dict) => {
  return post<any>('sys/dict', data)
}

/**
 * 更新数据字典
 * @param data 数据字典
 * @returns
 */
export const updateDict = (data: Dict) => {
  return put<any>('sys/dict', data)
}

/**
 * 查询数据字典
 * @param id 数据字典Id
 * @returns 数据字典
 */
export const getDict = (id: string) => {
  return get<Dict>(`sys/dict/${id}`)
}

/**
 * 查询数据字典列表
 * @param cond 查询条件
 * @returns 数据字典列表
 */
export const getDictPageList = (cond: PageQuery) => {
  return get<Dict[]>('sys/dict/page', cond)
}

/**
 * 查询数据字典列表
 * @param cond 查询条件
 * @returns 数据字典列表
 */
export const getDictList = () => {
  return get<DictData[]>('sys/dict/list')
}

/**
 * 删除数据字典
 * @param ids 数据字典Id集合
 * @returns
 */
export const delDict = (ids: string) => {
  return del<any>(`sys/dict/${ids}`)
}
