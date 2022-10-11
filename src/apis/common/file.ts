import http from '@/utils/http'

/**
 * 上传文件
 * @param data 文件
 * @returns
 */
export const uploadFile = (data: any) => {
  return http.post<any>('file', data)
}
