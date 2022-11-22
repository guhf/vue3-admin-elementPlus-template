import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { useDictStore } from './dict'
import { getToken, setToken, removeToken } from '@/utils/cache'
import { defaultAvatar } from '@/config/user.config'
import { LoginInfo, Token, UserInfo } from '@/models/userModel'

import { login, getOnlineInfo, getMenuList } from '@/apis/user'
import { Routes } from '@/models/route/routesModel'
import { Response } from '@/models/response'
import { useTagsViewStore } from './tagsView'
import { getDictList } from '@/apis/sys/dict'
import { DictData } from '@/models/sys/dictModel'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      userInfo: {} as UserInfo,
      notifyTotal: 0 as number
    }
  },
  actions: {
    login(loginInfo: LoginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(async (res: Response<Token>) => {
          this.token = res.data.accessToken
          setToken(res.data.accessToken)
          
          // 登录后先获取权限信息，否则跳转路由会出错
          await this.getUserInfo()
          await this.getMenuList()
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout() {
      this.removeToken()
    },
    getUserInfo() {
      return new Promise((resolve, reject) =>{
        getOnlineInfo().then((res: Response<UserInfo>) => {
          this.userInfo = res.data
          this.userInfo.avatar = res.data.avatar || defaultAvatar

          // 获取全部字典信息
          this.getDictList()
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getMenuList() {
      return new Promise((resolve, reject) =>{
        getMenuList().then((res: Response<Routes>) => {
          usePermissionStore().setRoutes(res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDictList() {
      return new Promise((resolve, reject) => {
        getDictList().then((res: Response<DictData[]>) => {
          useDictStore().setDictData(res.data)
        })
      })
    },
    refreshToken() {
      // TODO 一定时间后刷新Token
    },
    removeToken() {
      this.token = ''
      this.userInfo = {} as UserInfo
      useTagsViewStore().cachedViews = []
      removeToken()
    }
  }
})
