import * as signalR from '@microsoft/signalr'
import { useUserStore } from '@/store/user'

const hubUrl = (import.meta.env.VITE_SIGNALR_URL || '') as string
const userStore = useUserStore()

/**
 * 实例化SignalR连接器
 */
const connection = new signalR.HubConnectionBuilder()
// 配置通道路由
.withUrl(hubUrl, { accessTokenFactory: () => userStore.token })
.withAutomaticReconnect()
// 日志信息
.configureLogging(signalR.LogLevel.Information)
.build()

/**
 * 建立SignalR连接
 * @returns
 */
const startConnection = () => {
  if(connection.state === 'Disconnected'){
    connection.start().then((obj) => {
    }).catch((err: any) => {
      console.error('signalR连接失败：', err.toString())
    })
  }
}

/**
 * SignalR呼叫服务器
 * @param methodName 集线器名称
 * @param params 传递参数
 * @returns
 */
 const invokeServer = (methodName: string, params: any = null) => {
  if (connection != null) {
    connection.invoke(methodName, params).then((obj) => {
      console.log('signalR呼叫服务器成功：', obj);
    }).catch((err) => {
      console.error('signalR呼叫服务器失败：', err.toString())
    })
  }
}

/**
 * SignalR服务器调用客户端
 * @param methodName 集线器名称
 * @returns
 */
 const receiveClient = (methodName: string, callback?: Function) => {
  if (connection != null) {
    connection.on(methodName, (data: string) => {
      userStore.notifyTotal = userStore.notifyTotal + 1
      if(callback) callback(data)
    })
  }
}

/**
 * 关闭SignalR连接
 * @returns
 */
 const stopConnection = () => {
  if (connection != null) {
    connection.stop()
  }
}

/** SignalR服务 */
export function useSignalR(){
  startConnection()
  
  return {
    invokeServer,
    receiveClient,
    stopConnection
  }
}