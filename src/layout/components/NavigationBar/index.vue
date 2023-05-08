<template>
  <div class="navbar">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @click="toggleSideBar" />
    <BreadCrumb id="breadcrumb-container" />
  </div>
</template>

<script  lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '~/store/app'

import BreadCrumb from '~/components/BreadCrumb/index.vue'
import Hamburger from '~/components/Hamburger/index.vue'

const appStore = useAppStore()

const sidebar = computed(() => {
  return appStore.sidebar
})

const toggleSideBar = () => {
  appStore.toggleSidebar(false)
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  display: flex;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
}
</style>
