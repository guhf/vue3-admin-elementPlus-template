import axios from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import type { AxiosRequestConfig, Method } from 'axios'
import useRouter from '~/router'
import { useUserStore } from '~/store/user'
import networkConfig from '~/config/net.config'
import loadingBlackList from '~/config/blacklist/loading'
import { ResponseCode } from '~/constant/responses'
import { svg2 } from '~/constant/loading'

const router = useRouter
const route = useRouter.currentRoute.value

interface Requesting {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: (msg: string) => void
}

// 正在请求列表
const requestingList: Requesting[] = []
const CancelToken = axios.CancelToken
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
 * @param config 请求参数
 */
const removeCompleteRequest = (config: AxiosRequestConfig) => {
  for (let index = 0; index < requestingList.length; index++) {
    const request = requestingList[index]
    if (request.url === config.url && request.method === config.method && JSON.stringify(request.params) === JSON.stringify(config.params) && JSON.stringify(request.data) === JSON.stringify(config.data) && request.t === config.timeout) {
      requestingList.splice(index, 1)
      break
    }
  }
}

// 请求拦截器
http.interceptors.request.use(
  (request: any) => {
    const token = useUserStore().token
    token ? (request.headers['Authorization'] = token) : delete request.headers['Authorization']

    if (loadingCount === 0 && !loadingBlackList.includes(request.url) && (document.querySelector('.el-dialog') || document.querySelector('.app-main-wrapper'))) {
      loadingInstance = ElLoading.service({
        text: request.extra.loadingText || '加载中...',
        background: 'rgba(0, 0, 0, 0.3)',
        svg: svg2,
        svgViewBox: '0 0 100 100',
        customClass: 'customer-loading',
        target: (document.querySelector('.el-dialog') || document.querySelector('.app-main-wrapper')) as HTMLInputElement,
      })
    }
    loadingCount++

    request.cancelToken = new CancelToken((c) => {
      requestingList.push({ url: request.url, method: request.method, params: request.params, data: request.data, cancel: c })
    })
    return request
  },
  (error) => {
    loadingCount > 0 && loadingCount--
    return Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    loadingCount > 0 && loadingCount--
    if (loadingInstance && loadingCount === 0) {
      loadingInstance.close()
    }

    console.log(1111, response.config)

    removeCompleteRequest(response.config)
    if (response.data.code === ResponseCode.OK) {
      return Promise.resolve(response)
    } else {
      // console.log('接口请求成功，返回错误信息', response)
      return Promise.reject(ElMessage.error(response.data.msg))
    }
  },
  (error) => {
    loadingCount > 0 && loadingCount--
    loadingInstance && loadingInstance.close()
    const response = error.response
    console.log(2222, response.config)
    removeCompleteRequest(response.config)

    if (!response) {
      ElMessage.error('网络错误，请稍后重试！')
      return Promise.reject('网络错误，请稍后重试！')
    }

    // 根据返回的http状态码做不同的处理
    switch (response.status) {
      case ResponseCode.Unauthorized:
        ElMessage.error(response.data.msg)
        useUserStore().logout()
        window.location.href = `/login?redirect=${route.fullPath}`
        break
      case ResponseCode.PreconditionFailed:
        // TODO凭证失效，使用refreshToken重新获取凭证
        // 清楚全部请求，将关闭的请求存放在数组内，凭证获取后重新发起请求
        // 添加一个字段如果正在重新获取凭证则不在获取
        //

        requestingList.forEach((request) => {
          request.cancel('')
        })

        useUserStore()
          .refreshAccessToken()
          .then(() => {
            // 获取到新token 继续刚才请求
            requestingList.forEach((request) => {
              request.cancel('')
            })
          })
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

export default http
