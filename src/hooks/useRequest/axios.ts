import axios, { AxiosRequestConfig, Method } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import useRouter from '@/router'
import { useUserStore } from '@/store/user'
import networkConfig from '@/config/net.config'
import loadingBlackList from '@/config/blacklist/loading'
import { ResponseCode } from '@/constant/responses'
import { svg2 } from '@/constant/loading'

const router = useRouter
const route = useRouter.currentRoute.value

interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: Function
}

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
let loadingInstance: any; let loadingCount = 0

// axios 实例
const http = axios.create({
  baseURL: networkConfig.host,
  timeout: networkConfig.timeout,
  headers: networkConfig.headers
})

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作频繁，请稍后重试！')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

// 请求拦截器
http.interceptors.request.use((request: any) => {
  const token = useUserStore().token
  token ? request.headers['Authorization'] = token : delete request.headers['Authorization']

  if (loadingCount === 0 && loadingBlackList.indexOf(request.url) === -1 && ((document.querySelector('.el-dialog') || document.querySelector('.app-container')))) {
    loadingInstance = ElLoading.service({
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.3)',
      svg: svg2,
      svgViewBox: '0 0 100 100',
      customClass: 'customer-loading',
      target: (document.querySelector('.el-dialog') || document.querySelector('.app-container')) as HTMLInputElement
    })
  }
  loadingCount++

  // removePending(request);
  request.cancelToken = new CancelToken((c) => {
    pending.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c })
  })
  return request
},
error => {
  loadingCount > 0 && loadingCount--
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
  loadingCount > 0 && loadingCount--
  if (loadingInstance && loadingCount === 0){
    loadingInstance.close();
  }

  // removePending(response.config);
  if (response.data.code === ResponseCode.OK) {
    return Promise.resolve(response)
  } else {
    console.log('接口请求成功，返回错误信息', response);
    return Promise.reject(ElMessage.error(response.data.msg))
  }
},
error => {
  loadingCount > 0 && loadingCount--
  loadingInstance && loadingInstance.close();
  const response = error.response
  
  if(!response){
    ElMessage.error('网络错误，请稍后重试！')
    return Promise.reject('网络错误，请稍后重试！')
  }
  
  // 根据返回的http状态码做不同的处理
  switch (response.status) {
    case ResponseCode.Unauthorized:
    case ResponseCode.PreconditionFailed:
      ElMessage.error(response.data.msg)
      useUserStore().logout()
      window.location.href = `/login?redirect=${route.fullPath}`
      break
    case ResponseCode.Forbidden:
      router.push({
        path: '/403'
      })

      ElMessage.error(response.data.msg)
      return Promise.reject(response.data.msg)
    case ResponseCode.NotFound: // 数据不存在
      ElMessage.error('当前请求接口不存在')
      return Promise.reject(response.data.msg)
    case ResponseCode.Failed: // 请求失败
    case ResponseCode.Error: // 服务端错误
    case ResponseCode.Unavailable:
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data.msg)
  }

  // // 超时重新请求
  // const config = error.config;
  // // 全局的请求次数,请求的间隙
  // const [RETRY_COUNT, RETRY_DELAY] = [3, 1000];

  // if (config && RETRY_COUNT) {
  //     // 设置用于跟踪重试计数的变量
  //     config.__retryCount = config.__retryCount || 0;
  //     // 检查是否已经把重试的总数用完
  //     if (config.__retryCount >= RETRY_COUNT) {
  //         return Promise.reject(response || { message: error.message });
  //     }
  //     // 增加重试计数
  //     config.__retryCount++;
  //     // 创造新的Promise来处理指数后退
  //     const backoff = new Promise<void>((resolve) => {
  //         setTimeout(() => {
  //             resolve();
  //         }, RETRY_DELAY || 1);
  //     });
  //     // instance重试请求的Promise
  //     return backoff.then(() => {
  //         return http(config);
  //     });
  // }

  // eslint-disable-next-line
})

export default http
