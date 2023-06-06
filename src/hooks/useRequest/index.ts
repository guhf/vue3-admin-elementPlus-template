import HttpClient from './httpClient'
import { ContentType, Method } from './type'
import type { RequestParams } from './type'

export const useRequest = () => {
  /**
   * GET请求
   * @param path 请求地址
   * @param params 请求参数
   * @param extra 额外参数
   */
  const get = <T>(path = '', params?: RequestParams, extra: any = {}) => {
    return HttpClient.request<T>(path, Method.GET, params, ContentType.form, extra)
  }

  /**
   * POST请求
   * @param path 请求地址
   * @param params 请求参数
   * @param extra 额外参数
   */
  const post = <T>(path = '', params?: RequestParams, extra: any = {}) => {
    return HttpClient.request<T>(path, Method.POST, params, ContentType.json, extra)
  }

  /**
   * PUT请求
   * @param path 请求地址
   * @param params 请求参数
   * @param extra 额外参数
   */
  const put = <T>(path = '', params?: RequestParams, extra: any = {}) => {
    return HttpClient.request<T>(path, Method.PUT, params, ContentType.json, extra)
  }

  /**
   * PATCH请求
   * @param path 请求地址
   * @param params 请求参数
   * @param extra 额外参数
   */
  const patch = <T>(path = '', params?: RequestParams, extra: any = {}) => {
    return HttpClient.request<T>(path, Method.PATCH, params, ContentType.json, extra)
  }

  /**
   * DELETE请求
   * @param path 请求地址
   * @param params 请求参数
   * @param extra 额外参数
   */
  const del = <T>(path = '', params?: RequestParams, extra: any = {}) => {
    return HttpClient.request<T>(path, Method.DELETE, params, ContentType.json, extra)
  }

  return {
    get,
    post,
    put,
    patch,
    del,
  }
}
