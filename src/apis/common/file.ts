import { useRequest } from '@/hooks'
const { post } = useRequest()

/**
 * 上传文件
 * @param data 文件
 * @returns
 */
export const uploadFile = (data: any) => {
  return post<any>('file', data)
}
