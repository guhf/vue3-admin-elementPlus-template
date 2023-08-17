import Keys from '~/constant/keys'
import { settingConfig } from '~/config'
import { StorageLocation } from '~/constant/settings'

// 暂时未想到更好方法
const createStorage = () => {
  switch (settingConfig.storage) {
    case StorageLocation.LocalStorage:
      return localStorage
    case StorageLocation.SessionStorage:
      return sessionStorage
    default:
      return localStorage
  }
}

const storage = createStorage()

export const clearCache = () => storage.clear()

export const getSidebarStatus = () => storage.getItem(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => storage.setItem(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = () => storage.getItem(Keys.languageKey)
export const setLanguage = (language: string) => storage.setItem(Keys.languageKey, language)

export const getToken = () => storage.getItem(Keys.tokenKey)
export const setToken = (token: string) => storage.setItem(Keys.tokenKey, token)
export const removeToken = () => storage.removeItem(Keys.tokenKey)

export const getRefreshToken = () => storage.getItem(Keys.refreshTokenKey)
export const setRefreshToken = (refreshToken: string) => storage.setItem(Keys.refreshTokenKey, refreshToken)
export const removeRefreshToken = () => storage.removeItem(Keys.refreshTokenKey)
