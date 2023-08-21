import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import refreshTokenService from './refreshTokenService'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import useRouter from '~/router'
import { useUserStore } from '~/store/user'
import networkConfig from '~/config/net.config'
import loadingBlackList from '~/config/blacklist/loading'
import { ResponseCode } from '~/constant/responses'
import { svg2 } from '~/constant/loading'

const router = useRouter
const route = useRouter.currentRoute.value

interface Requesting {
  http: AxiosInstance
  config: any
  controller: AbortController
}

// 正在请求列表
const requestingQueue: Requesting[] = []
let loadingInstance: any
let loadingCount = 0

// axios 实例
const http = axios.create({
  baseURL: networkConfig.host,
  timeout: networkConfig.timeout,
  headers: networkConfig.headers,
})

/**
 * 移除完成请求
 * @param config 请求配置
 */
const removeCompleteRequest = (config: AxiosRequestConfig) => {
  for (let index = 0; index < requestingQueue.length; index++) {
    const request = requestingQueue[index]

    if (request.config.url === config.url && request.config.method === config.method && JSON.stringify(request.config.params) === JSON.stringify(config.params) && JSON.stringify(request.config.data) === JSON.stringify(config.data)) {
      requestingQueue.splice(index, 1)
      break
    }
  }
}

// 请求拦截器
http.interceptors.request.use(
  async (config: any) => {
    const token = useUserStore().token
    token ? (config.headers['Authorization'] = token) : delete config.headers['Authorization']

    if (loadingCount === 0 && !loadingBlackList.includes(config.url) && (document.querySelector('.el-dialog') || document.querySelector('.app-main-wrapper'))) {
      loadingInstance = ElLoading.service({
        text: config.extra.loadingText || '加载中...',
        background: 'rgba(0, 0, 0, 0.3)',
        svg: svg2,
        svgViewBox: '0 0 100 100',
        customClass: 'customer-loading',
        target: (document.querySelector('.el-dialog') || document.querySelector('.app-main-wrapper')) as HTMLInputElement,
      })
    }
    loadingCount++

    const abortController = new AbortController()
    config.signal = abortController.signal
    requestingQueue.push({ http, config, controller: abortController })

    return config
  },
  (error) => {
    loadingCount > 0 && loadingCount--
    return Promise.reject(error)
  }
)

let isRefresh = false
// 添加响应拦截器
http.interceptors.response.use(
  async (response) => {
    loadingCount > 0 && loadingCount--
    if (loadingInstance && loadingCount === 0) {
      loadingInstance.close()
    }

    if (response.data.code !== ResponseCode.Unauthorized) {
      removeCompleteRequest(response.config)
    }
    switch (response.data.code) {
      case ResponseCode.OK:
        return Promise.resolve(response)
      case ResponseCode.Unauthorized:
        if (response.headers['token-expired']) {
          // refreshToken失效，重新登录
          if (response.headers['refreshtoken-expired']) {
            ElMessage.error(response.data.msg)
            useUserStore().logout()
            window.location.href = `/login?redirect=${route.fullPath}`
          }

          await refreshTokenService.refreshToken()
          return Promise.resolve(http(response.config))
        }
        break
      case ResponseCode.PreconditionFailed:
        break
      case ResponseCode.Forbidden:
        router.push({
          path: '/403',
        })

        ElMessage.error(response.data.msg)
        return Promise.reject(response.data.msg)
      case ResponseCode.NotFound: // 数据不存在
        ElMessage.error('当前请求接口不存在')
        return Promise.reject(response.data.msg)
      case ResponseCode.Failed: // 请求失败
      case ResponseCode.Error: // 服务端错误
      case ResponseCode.Unavailable:
      default:
        ElMessage.error(response.data.msg)
        return Promise.reject(response.data.msg)
    }
  },
  (error) => {
    loadingCount > 0 && loadingCount--
    loadingInstance && loadingInstance.close()
    const response = error.response
    removeCompleteRequest(response.config)

    if (isRefresh) {
      return
    }

    if (!response) {
      ElMessage.error('网络错误，请稍后重试！')
      return Promise.reject('网络错误，请稍后重试！')
    }

    // 根据返回的http状态码做不同的处理
    switch (response.status) {
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
  }
)

// 如果正在刷新token时，需等待token刷新完毕再触发接口请求(暂时挂起)
const request = async () => {
  let refreshIsLoading = refreshTokenService.refreshing()
  if (refreshIsLoading) {
    await refreshTokenService.refreshToken()
  }

  return http
}

export default await request().then((response) => {
  return response
})
