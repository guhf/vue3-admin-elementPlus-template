import { useRequest } from '@/hooks'
import { AttrTemplate } from '@/models/product/attrTemplateModel'
import { PageQuery } from '@/models/common/pageQueryModel'

const { get, post, put, del } = useRequest()

/**
 * 创建商品规格
 * @param data 商品规格
 * @returns
 */
export const createAttrTemplate = (data: AttrTemplate) => {
  return post<any>('product/attrtemplate', data)
}

/**
 * 更新商品规格
 * @param data 商品规格
 * @returns
 */
export const updateAttrTemplate = (data: AttrTemplate) => {
  return put<any>('product/attrtemplate', data)
}

/**
 * 查询商品规格
 * @param id 商品规格Id
 * @returns 商品规格
 */
export const getAttrTemplate = (id : string) => {
  return get<AttrTemplate>(`product/attrtemplate/${id}`)
}

/**
 * 查询商品规格列表
 * @param cond 查询条件
 * @returns 商品规格列表
 */
export const getAttrTemplatePageList = (cond: PageQuery) => {
  return get<AttrTemplate[]>('product/attrtemplate/page', cond)
}

/**
 * 删除商品规格
 * @param ids 商品规格Id集合
 * @returns
 */
export const delAttrTemplate = (ids: string) => {
  return del<any>(`product/attrtemplate/${ids}`)
}