import Keys from '~/constant/keys'

export const clearCache = () => localStorage.clear()

export const getSidebarStatus = () => localStorage.getItem(Keys.sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => localStorage.setItem(Keys.sidebarStatusKey, sidebarStatus)

export const getLanguage = () => localStorage.getItem(Keys.languageKey)
export const setLanguage = (language: string) => localStorage.setItem(Keys.languageKey, language)

export const getToken = () => localStorage.getItem(Keys.tokenKey)
export const setToken = (token: string) => localStorage.setItem(Keys.tokenKey, token)
export const removeToken = () => localStorage.removeItem(Keys.tokenKey)
