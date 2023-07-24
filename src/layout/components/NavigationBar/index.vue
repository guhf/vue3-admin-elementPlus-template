<template>
  <div class="navbar" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '~/store/app'

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

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
}
</style>
