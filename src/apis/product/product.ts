import http from '@/utils/http'
import { Product } from '@/models/product/productModel'
import { PageQuery } from '@/models/common/pageQueryModel'

/**
 * 创建商品
 * @param data 商品
 * @returns
 */
export const createProduct = (data: Product) => {
  return http.post<any>('product', data)
}

/**
 * 更新商品
 * @param data 商品
 * @returns
 */
export const updateProduct = (data: Product) => {
  return http.put<any>('product', data)
}

/**
 * 查询商品
 * @param id 商品Id
 * @returns 商品
 */
export const getProduct = (id : string) => {
  return http.get<Product>(`product/${id}`)
}

/**
 * 查询商品列表
 * @param cond 查询条件
 * @returns 商品列表
 */
export const getProductPageList = (cond: PageQuery) => {
  return http.get<Product[]>('product/page', cond)
}

/**
 * 删除商品
 * @param ids 商品Id集合
 * @returns
 */
export const delProduct = (ids: string) => {
  return http.delete<any>(`product/${ids}`)
}

/**
 * 上架/下架商品
 * @param id 商品Id
 * @param enable 上架/下架
 * @returns
 */
export const shelvesProduct = (id: string, enable: boolean) => {
  return http.patch<any>(`product/${id}/${ enable ? 'on': 'the' }shelves`)
}

/**
 * 启用/禁用商品
 * @param id 商品Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableProduct = (id: string, enable: boolean) => {
  return http.patch<any>(`product/${id}/${ enable ? 'enable': 'disable' }`)
}