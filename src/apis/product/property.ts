import http from '@/utils/http'
import { Property } from '@/models/product/propertyModel'
import { PageQuery } from '@/models/common/pageQueryModel'

/**
 * 创建商品属性
 * @param data 商品属性
 * @returns
 */
export const createProperty = (data: Property) => {
  return http.post<any>('product/property', data)
}

/**
 * 更新商品属性
 * @param data 商品属性
 * @returns
 */
export const updateProperty = (data: Property) => {
  return http.put<any>('product/property', data)
}

/**
 * 查询商品属性
 * @param id 商品属性Id
 * @returns 商品属性
 */
export const getProperty = (id : string) => {
  return http.get<Property>(`product/property/${id}`)
}

/**
 * 查询商品属性列表
 * @param cond 查询条件
 * @returns 商品属性列表
 */
export const getPropertyPageList = (cond: PageQuery) => {
  return http.get<Property[]>('product/property/page', cond)
}

/**
 * 删除商品属性
 * @param ids 商品属性Id集合
 * @returns
 */
export const delProperty = (ids: string) => {
  return http.delete<any>(`product/property/${ids}`)
}