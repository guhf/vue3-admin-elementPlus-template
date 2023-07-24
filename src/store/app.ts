import { defineStore } from 'pinia'
import { getSidebarStatus, setLanguage, setSidebarStatus } from '~/utils/cache'
import { getLocale } from '~/locales'

export enum DeviceType {
  Web = 1,
  Desktop,
  Mobile,
}

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      device: DeviceType.Web,
      sidebar: {
        opened: getSidebarStatus() !== 'closed',
        withoutAnimation: false as boolean,
      },
      language: getLocale() as string,
    }
  },
  actions: {
    toggleSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        setSidebarStatus('opened')
      } else {
        setSidebarStatus('closed')
      }
    },
    closeSidebar(withoutAnimation: boolean) {
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
      setSidebarStatus('closed')
    },
    toggleDevice(device: DeviceType) {
      this.device = device
    },
    setLanguage(language: string) {
      this.language = language
      setLanguage(this.language)
    },
  },
})
