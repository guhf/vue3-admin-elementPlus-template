/**
 * 接口统一返回对象
 */
export interface Response<T>{
  code: number
  msg?: string
  data: T
  total?: number
  enums?: any
}

