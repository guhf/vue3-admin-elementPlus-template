import http from '@/utils/http'
import { Service } from '@/models/product/ServiceModel'
import { PageQuery } from '@/models/common/pageQueryModel'

/**
 * 创建商品服务
 * @param data 商品服务
 * @returns
 */
export const createService = (data: Service) => {
  return http.post<any>('product/service', data)
}

/**
 * 更新商品服务
 * @param data 商品服务
 * @returns
 */
export const updateService = (data: Service) => {
  return http.put<any>('product/service', data)
}

/**
 * 查询商品服务
 * @param id 商品服务Id
 * @returns 商品服务
 */
export const getService = (id : string) => {
  return http.get<Service>(`product/service/${id}`)
}

/**
 * 查询商品服务列表
 * @param cond 查询条件
 * @returns 商品服务列表
 */
export const getServicePageList = (cond: PageQuery) => {
  return http.get<Service[]>('product/service/page', cond)
}

/**
 * 删除商品服务
 * @param ids 商品服务Id集合
 * @returns
 */
export const delService = (ids: string) => {
  return http.delete<any>(`product/service/${ids}`)
}

/**
 * 启用/禁用商品服务
 * @param id 商品服务Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableService = (id: string, enable: boolean) => {
  return http.patch<any>(`product/service/${id}/${ enable ? 'enable': 'disable' }`)
}