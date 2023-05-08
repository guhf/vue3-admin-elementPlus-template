import { defineStore } from 'pinia'
import variables from '~/styles/variables.module.scss'
import layoutSettings from '~/config/layout.config'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      theme: variables.theme,
      fixedHeader: layoutSettings.fixedHeader,
      showSettings: layoutSettings.showSettings,
      showTagsView: layoutSettings.showTagsView,
      showSidebarLogo: layoutSettings.showSidebarLogo,
      sidebarTextTheme: layoutSettings.sidebarTextTheme
    }
  },
  actions: {
    changeSetting(payload: { key: string, value: any }) {
      const { key, value } = payload
      switch (key) {
        case 'theme':
          this.theme = value
          break
        case 'fixedHeader':
          this.fixedHeader = value
          break
        case 'showSettings':
          this.showSettings = value
          break
        case 'showSidebarLogo':
          this.showSidebarLogo = value
          break
        case 'showTagsView':
          this.showTagsView = value
          break
        case 'sidebarTextTheme':
          this.sidebarTextTheme = value
          break
        default:
          break
      }
    }
  }
})
