import Keys from '@/constant/keys'

export const clearCache = () => sessionStorage.clear()

export const getSidebarStatus = () => sessionStorage.getItem(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => sessionStorage.setItem(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = () => sessionStorage.getItem(Keys.languageKey)
export const setLanguage = (language: string) => sessionStorage.setItem(Keys.languageKey, language)

export const getToken = () => sessionStorage.getItem(Keys.tokenKey)
export const setToken = (token: string) => sessionStorage.setItem(Keys.tokenKey, token)
export const removeToken = () => sessionStorage.removeItem(Keys.tokenKey)
