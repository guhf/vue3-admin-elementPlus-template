import { RequestParams, Method, ContentType } from './type'
import http from './axios'
import lodash from 'lodash'
import { Response } from '~/models/response'
import { ResponseCode } from '~/constant/responses'

class HttpClient {
  public httpClient

  constructor() {
    this.httpClient = http
  }

  /**
   * @description: 封装请求类
   * @param path 请求路径
   * @param method 请求方式
   * @param params 参数
   * @param contentType http配置
   * @return
   */
  request<T>(path = '', method: Method = Method.GET, params?: RequestParams, contentType: ContentType = ContentType.json) {
    const headers = {
      'content-type': contentType
    }

    const requestConfig = {
      url: `${path}`,
      method,
      headers,
      params: {} as RequestParams,
      data: {}
    }

    if (contentType === ContentType.form) {
      requestConfig.params = lodash.pickBy(params, (item: any) => item) ?? {}
    } else {
      requestConfig.data = JSON.stringify(params)
    }

    return this.httpClient.request<Response<T>>(requestConfig).then((res: any) => {
      if (res && res.data) {
        const data = res.data as Response<T>

        if (res.status === ResponseCode.OK && data.code === ResponseCode.OK) {
          return data
        } else {
          return Promise.reject(res?.msg)
        }
      } else {
        return Promise.reject('请求出错')
      }
    }).catch(async error => {
      return Promise.reject(error)
    })
  }
}

export default new HttpClient()
