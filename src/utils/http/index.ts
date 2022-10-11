import HttpClient from './httpClient'
import { RequestParams, Method, ContentType } from './type'

export default {
  get<T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.form) {
    return HttpClient.request<T>(path, Method.GET, params, contentType)
  },

  post<T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) {
    return HttpClient.request<T>(path, Method.POST, params, contentType)
  },

  put<T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) {
    return HttpClient.request<T>(path, Method.PUT, params, contentType)
  },

  patch<T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) {
    return HttpClient.request<T>(path, Method.PATCH, params, contentType)
  },

  delete<T>(path = '', params?: RequestParams, contentType: ContentType = ContentType.json) {
    return HttpClient.request<T>(path, Method.DELETE, params, contentType)
  }
}
