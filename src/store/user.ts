import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { useDictStore } from './dict'
import { useTagsViewStore } from './tagsView'
import type { DictData } from '~/models/sys/dictModel'
import type { LoginInfo, Token, UserInfo } from '~/models/userModel'
import type { Routes } from '~/models/route/routesModel'
import type { Response } from '~/models/response'
import { getToken, removeToken, setToken } from '~/utils/cache'
import { defaultAvatar } from '~/config/user.config'

import { getMenuList, getOnlineInfo, login } from '~/apis/user'
import { getDictList } from '~/apis/sys/dict'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken() || '',
      userInfo: {} as UserInfo,
      notifyTotal: 0 as number,
      isAdmin: false,
      isSuper: false,
    }
  },
  actions: {
    login(loginInfo: LoginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo)
          .then(async (res: Response<Token>) => {
            this.token = `Bearer ${res.data.accessToken}`
            setToken(this.token)

            this.getUserInfo()
            // 登录后先获取权限信息，否则跳转路由会出错
            await this.getMenuList()

            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    logout() {
      this.removeToken()
    },
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getOnlineInfo()
          .then((res: Response<UserInfo>) => {
            this.userInfo = res.data
            this.userInfo.avatar = res.data.avatar || defaultAvatar
            ;(res.data.userRoles || []).forEach((role: any) => {
              if (role.isSuper) {
                this.isSuper = true
              }
              if (role.isAdmin) {
                this.isAdmin = true
              }
            })
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getMenuList() {
      return new Promise((resolve, reject) => {
        getMenuList()
          .then((res: Response<Routes>) => {
            usePermissionStore().setRoutes(res.data)
            // 获取全部字典信息
            this.getDictList()
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getDictList() {
      return new Promise((resolve, reject) => {
        getDictList()
          .then((res: Response<DictData[]>) => {
            useDictStore().setDictData(res.data)
            resolve(res.data)
          })
          .catch((error) => {
            reject(error)
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
    },
  },
})
