import HttpClient from './httpClient'
import { RequestParams, Method, ContentType } from './type'

export const useRequest = () => {
  /**
   * GET请求
   * @param path 请求地址
   * @param params 请求参数
   * @param contentType ContentType
   */
  const get = <T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.form) => {
    return HttpClient.request<T>(path, Method.GET, params, contentType)
  }

  /**
   * POST请求
   * @param path 请求地址
   * @param params 请求参数
   * @param contentType ContentType
   */
  const post = <T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) => {
    return HttpClient.request<T>(path, Method.POST, params, contentType)
  }
  
  /**
   * PUT请求
   * @param path 请求地址
   * @param params 请求参数
   * @param contentType ContentType
   */
  const put = <T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) => {
    return HttpClient.request<T>(path, Method.PUT, params, contentType)
  }
  
  /**
   * PATCH请求
   * @param path 请求地址
   * @param params 请求参数
   * @param contentType ContentType
   */
  const patch = <T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) => {
    return HttpClient.request<T>(path, Method.PATCH, params, contentType)
  }
  
  /**
   * DELETE请求
   * @param path 请求地址
   * @param params 请求参数
   * @param contentType ContentType
   */
  const del = <T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) => {
    return HttpClient.request<T>(path, Method.DELETE, params, contentType)
  }

  return{
    get,
    post,
    put,
    patch,
    del
  }
}
