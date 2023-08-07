import type { Label } from '~/models/product/labelModel'
import type { PageQuery } from '~/models/common/pageQueryModel'
import { useRequest } from '~/hooks'

const { get, post, put, patch, del } = useRequest()

/**
 * 创建商品标签
 * @param data 商品标签
 * @returns
 */
export const createLabel = (data: Label) => {
  return post<any>('product/label', data)
}

/**
 * 更新商品标签
 * @param data 商品标签
 * @returns
 */
export const updateLabel = (data: Label) => {
  return put<any>('product/label', data)
}

/**
 * 查询商品标签
 * @param id 商品标签Id
 * @returns 商品标签
 */
export const getLabel = (id: string) => {
  return get<Label>(`product/label/${id}`)
}

/**
 * 查询商品标签列表
 * @param cond 查询条件
 * @returns 商品标签列表
 */
export const getLabelPageList = (cond: PageQuery) => {
  return get<Label[]>('product/label/page', cond)
}

/**
 * 删除商品标签
 * @param ids 商品标签Id集合
 * @returns
 */
export const delLabel = (ids: string[]) => {
  return del<any>(`product/label`, ids)
}

/**
 * 启用/禁用商品标签
 * @param id 商品标签Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableLabel = (id: string, enable: boolean) => {
  return patch<any>(`product/label/${id}/${enable ? 'enable' : 'disable'}`)
}
