import { useRequest } from '@/hooks'
import { Property } from '@/models/product/propertyModel'
import { PageQuery } from '@/models/common/pageQueryModel'

const { get, post, put, del } = useRequest()

/**
 * 创建商品属性
 * @param data 商品属性
 * @returns
 */
export const createProperty = (data: Property) => {
  return post<any>('product/property', data)
}

/**
 * 更新商品属性
 * @param data 商品属性
 * @returns
 */
export const updateProperty = (data: Property) => {
  return put<any>('product/property', data)
}

/**
 * 查询商品属性
 * @param id 商品属性Id
 * @returns 商品属性
 */
export const getProperty = (id : string) => {
  return get<Property>(`product/property/${id}`)
}

/**
 * 查询商品属性列表
 * @param cond 查询条件
 * @returns 商品属性列表
 */
export const getPropertyPageList = (cond: PageQuery) => {
  return get<Property[]>('product/property/page', cond)
}

/**
 * 删除商品属性
 * @param ids 商品属性Id集合
 * @returns
 */
export const delProperty = (ids: string) => {
  return del<any>(`product/property/${ids}`)
}