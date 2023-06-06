<template>
  <div class="top-bar-wrap">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @click="toggleSideBar" />
    <Tools />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import Tools from '../Tools/index.vue'
import { useAppStore } from '~/store/app'
import Hamburger from '~/components/hamburger/index.vue'

const appStore = useAppStore()

const sidebar = computed(() => {
  return appStore.sidebar
})

const toggleSideBar = () => {
  appStore.toggleSidebar(false)
}
</script>

<style lang="scss" scoped>
.top-bar-wrap {
  height: 50px;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .hamburger-container {
    height: 100%;
    padding: 0 15px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
  }
}
</style>
