import http from '@/utils/http'
import { Label } from '@/models/product/labelModel'
import { PageQuery } from '@/models/common/pageQueryModel'

/**
 * 创建商品标签
 * @param data 商品标签
 * @returns
 */
export const createLabel = (data: Label) => {
  return http.post<any>('product/label', data)
}

/**
 * 更新商品标签
 * @param data 商品标签
 * @returns
 */
export const updateLabel = (data: Label) => {
  return http.put<any>('product/label', data)
}

/**
 * 查询商品标签
 * @param id 商品标签Id
 * @returns 商品标签
 */
export const getLabel = (id : string) => {
  return http.get<Label>(`product/label/${id}`)
}

/**
 * 查询商品标签列表
 * @param cond 查询条件
 * @returns 商品标签列表
 */
export const getLabelPageList = (cond: PageQuery) => {
  return http.get<Label[]>('product/label/page', cond)
}

/**
 * 删除商品标签
 * @param ids 商品标签Id集合
 * @returns
 */
export const delLabel = (ids: string) => {
  return http.delete<any>(`product/label/${ids}`)
}