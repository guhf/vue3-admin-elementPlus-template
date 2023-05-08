import { useRequest } from '~/hooks'
import { Attribute } from '~/models/product/attributeModel'
import { PageQuery } from '~/models/common/pageQueryModel'

const { get, post, put, del } = useRequest()

/**
 * 创建商品规格
 * @param data 商品规格
 * @returns
 */
export const createAttribute = (data: Attribute) => {
  return post<any>('product/attribute', data)
}

/**
 * 更新商品规格
 * @param data 商品规格
 * @returns
 */
export const updateAttribute = (data: Attribute) => {
  return put<any>('product/attribute', data)
}

/**
 * 查询商品规格
 * @param id 商品规格Id
 * @returns 商品规格
 */
export const getAttribute = (id : string) => {
  return get<Attribute>(`product/attribute/${id}`)
}

/**
 * 查询商品规格列表
 * @param cond 查询条件
 * @returns 商品规格列表
 */
export const getAttributePageList = (cond: PageQuery) => {
  return get<Attribute[]>('product/attribute/page', cond)
}

/**
 * 删除商品规格
 * @param ids 商品规格Id集合
 * @returns
 */
export const delAttribute = (ids: string) => {
  return del<any>(`product/attribute/${ids}`)
}