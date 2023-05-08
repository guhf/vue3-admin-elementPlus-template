import { useRequest } from '~/hooks'
const { get, put, del } = useRequest()

/**
 * 创建区域
 * @param data 区域
 * @returns
 */
export const createDistrict = (data: any) => {
  return get<any>('district', data)
}

/**
* 更新区域
* @param data 区域
* @returns
*/
export const updateDistrict = (data: any) => {
  return put<any>('district', data)
}

/**
* 查询区域
* @param id 区域Id
* @returns 区域
*/
export const getDistrict = (id : number) => {
  return get<any>(`district/${id}`)
}

/**
* 查询区域列表
* @param cond 查询条件
* @returns 区域列表
*/
export const getDistrictPageList = (cond: any) => {
  return get<any>('district', cond)
}

/**
* 删除区域
* @param ids 区域Id集合
* @returns
*/
export const delDistrict = (ids: string) => {
  return del<any>('district/' + ids)
}

// #region 下拉框

/**
* 查询国家下拉框列表
* @returns 国家下拉框列表
*/
export const getCountryList = () => {
  return get<any>('district/country')
}

/**
* 查询省份下拉框列表
* @returns 省份下拉框列表
*/
export const getProvinceList = () => {
  return get<any>('district/province')
}

/**
* 查询城市下拉框列表
* @param parentId 父级Id
* @returns 城市下拉框列表
*/
export const getCityList = (parentId : number) => {
  return get<any>(`district/${parentId}/city`)
}

/**
 * 查询区/县下拉框列表
 * @param parentId 父级Id
 * @returns 区/县下拉框列表
 */
export const getDistrictList = (parentId : number) => {
  return get<any>(`district/${parentId}/district`)
}

/**
* 街道下拉框列表
* @param parentId 父级Id
* @returns 街道下拉框列表
*/
export const getStreetList = (parentId : number) => {
  return get<any>(`district/${parentId}/street`)
}

// #region
