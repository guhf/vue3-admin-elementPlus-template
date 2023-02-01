import { useRequest } from '@/hooks'
import { Product } from '@/models/product/productModel'
import { PageQuery } from '@/models/common/pageQueryModel'

const { get, post, put, patch, del } = useRequest()

/**
 * 创建商品
 * @param data 商品
 * @returns
 */
export const createProduct = (data: Product) => {
  return post<any>('product', data)
}

/**
 * 更新商品
 * @param data 商品
 * @returns
 */
export const updateProduct = (data: Product) => {
  return put<any>('product', data)
}

/**
 * 查询商品
 * @param id 商品Id
 * @returns 商品
 */
export const getProduct = (id : string) => {
  return get<Product>(`product/${id}`)
}

/**
 * 查询商品列表
 * @param cond 查询条件
 * @returns 商品列表
 */
export const getProductPageList = (cond: PageQuery) => {
  return get<Product[]>('product/page', cond)
}

/**
 * 删除商品
 * @param ids 商品Id集合
 * @returns
 */
export const delProduct = (ids: string) => {
  return del<any>(`product/${ids}`)
}

/**
 * 上架/下架商品
 * @param id 商品Id
 * @param shelves 上架/下架
 * @returns
 */
export const shelvesProduct = (id: string, shelves: boolean) => {
  return patch<any>(`product/${id}/${ shelves ? 'shelves': 'offshelves' }`)
}