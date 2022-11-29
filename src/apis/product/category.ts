import http from '@/utils/http'
import { Category } from '@/models/product/categoryModel'
import { Tree } from '@/models/common/treeModel'

/**
 * 创建商品分类
 * @param data 商品分类
 * @returns
 */
export const createCategory = (data: Category) => {
  return http.post<any>('product/category', data)
}

/**
 * 更新商品分类
 * @param data 商品分类
 * @returns
 */
export const updateCategory = (data: Category) => {
  return http.put<any>('product/category', data)
}

/**
 * 查询商品分类
 * @param id 商品分类Id
 * @returns 商品分类
 */
export const getCategory = (id : string) => {
  return http.get<Category>(`product/category/${id}`)
}

/**
 * 查询商品分类列表
 * @param cond 查询条件
 * @returns 商品分类列表
 */
export const getCategoryTreeList = () => {
  return http.get<Tree>('product/category/tree')
}

/**
 * 查询商品分类列表（排除指定分类）
 * @param id 商品分类Id
 * @returns 商品分类列表
 */
export const getCategoryExcludeTreeList = (id : string) => {
  return http.get<Tree>(`product/category/exclude/${id}/tree`)
}

/**
 * 删除商品分类
 * @param ids 商品分类Id集合
 * @returns
 */
export const delCategory = (ids: string) => {
  return http.delete<any>(`product/category/${ids}`)
}

/**
 * 启用/禁用商品分类
 * @param id 商品分类Id
 * @param enable 启用/禁用
 * @returns
 */
export const enableDisableCategory = (id: string, enable: boolean) => {
  return http.patch<any>(`product/category/${id}/${ enable ? 'enable': 'disable' }`)
}

/**
 * 移动商品分类
 * @param id 商品分类Id集合
 * @returns
 */
export const moveCategory = (id: string, newParentId: string) => {
  return http.patch<any>(`product/category/${id}/moveto/${newParentId}`)
}