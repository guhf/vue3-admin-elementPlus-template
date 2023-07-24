import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DeviceType, useAppStore } from '~/store/app'

const WIDTH = 992 // refer to Bootstrap's responsive design\
const appStore = useAppStore()

export default function () {
  const device = computed(() => {
    return appStore.device
  })

  const sidebar = computed(() => {
    return appStore.sidebar
  })

  const currentRoute = useRoute()
  const watchRouter = watch(
    () => currentRoute.name,
    () => {
      if (appStore.device === DeviceType.Mobile && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    }
  )

  const isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const resizeMounted = () => {
    if (isMobile()) {
      appStore.toggleDevice(DeviceType.Mobile)
      appStore.closeSidebar(true)
    }
  }

  const resizeHandler = () => {
    if (!document.hidden) {
      appStore.toggleDevice(isMobile() ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile()) {
        appStore.closeSidebar(false)
      }
    }
  }
  const addEventListenerOnResize = () => {
    window.addEventListener('resize', resizeHandler)
  }

  const removeEventListenerResize = () => {
    window.removeEventListener('resize', resizeHandler)
  }

  return {
    device,
    sidebar,
    resizeMounted,
    addEventListenerOnResize,
    removeEventListenerResize,
    watchRouter,
  }
}
