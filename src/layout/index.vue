<template>
  <el-container class="app-container">
    <el-aside class="aside-container" :width="sidebar.opened ? '240px' : '60px'">
      <Sidebar :class="{ 'hide-sidebar': !sidebar.opened }" />
    </el-aside>
    <el-main :class="classObj" class="main-container">
      <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="state.handleClickOutside" />
      <div class="main-wrapper">
        <TopBar />
        <TagsView v-if="showTagsView" />
        <AppMain />
        <!-- <RightPanel v-if="showSettings">
          <Settings />
        </RightPanel> -->
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, onBeforeUnmount, onMounted, reactive } from 'vue'

import AppMain from './components/AppMain.vue'
import TopBar from './components/TopBar/index.vue'
import Sidebar from './components/SideBar/index.vue'
import TagsView from './components/TagsView/index.vue'
// import RightPanel from '~/components/right-panel/index.vue'
// import Settings from './Settings/index.vue'
import resize from './resize'
import { useSettingsStore } from '~/store/settings'
import { DeviceType, useAppStore } from '~/store/app'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const { sidebar, addEventListenerOnResize, resizeMounted, removeEventListenerResize, watchRouter } = resize()
const state = reactive({
  handleClickOutside: () => {
    appStore.closeSidebar(false)
  },
})

const classObj = computed(() => {
  return {
    'without-animation': sidebar.value.withoutAnimation,
    mobile: device.value === DeviceType.Mobile,
  }
})

// const showSettings = computed(() => {
//   return settingsStore.showSettings
// })
const showTagsView = computed(() => {
  return settingsStore.showTagsView
})

const device = computed(() => {
  return appStore.device
})

watchRouter()

onBeforeMount(() => {
  addEventListenerOnResize()
})

onMounted(() => {
  resizeMounted()
})

onBeforeUnmount(() => {
  removeEventListenerResize()
})
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  height: 100%;
  width: 100%;

  header {
    background-color: $primary;
    padding: 0;
  }

  .aside-container {
    padding: 0;
    margin-bottom: 0;
  }

  .main-container {
    width: 0;
    height: 100%;
    flex: 1;
    transition: margin-left 0.5s;
    position: relative;

    display: flex;
    flex-direction: row;
    padding: 0;

    .main-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
