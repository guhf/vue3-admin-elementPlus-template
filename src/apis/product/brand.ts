import http from '@/utils/http'
import { Brand } from '@/models/product/brandModel'
import { PageQuery } from '@/models/common/pageQueryModel'

/**
 * 创建商品品牌
 * @param data 商品品牌
 * @returns
 */
export const createBrand = (data: Brand) => {
  return http.post<any>('product/brand', data)
}

/**
 * 更新商品品牌
 * @param data 商品品牌
 * @returns
 */
export const updateBrand = (data: Brand) => {
  return http.put<any>('product/brand', data)
}

/**
 * 查询商品品牌
 * @param id 商品品牌Id
 * @returns 商品品牌
 */
export const getBrand = (id : string) => {
  return http.get<Brand>(`product/brand/${id}`)
}

/**
 * 查询商品品牌列表
 * @param cond 查询条件
 * @returns 商品品牌列表
 */
export const getBrandPageList = (cond: PageQuery) => {
  return http.get<Brand[]>('product/brand/page', cond)
}

/**
 * 删除商品品牌
 * @param ids 商品品牌Id集合
 * @returns
 */
export const delBrand = (ids: string) => {
  return http.delete<any>(`product/brand/${ids}`)
}

/**
 * 启用/禁用商品品牌
 * @param id 商品品牌Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableBrand = (id: string, enable: boolean) => {
  return http.patch<any>(`product/brand/${id}/${ enable ? 'enable': 'disable' }`)
}