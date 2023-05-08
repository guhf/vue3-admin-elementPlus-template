<template>
  <div class="sideWrap">
    <!-- <Logo v-if="showLogo" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        mode="vertical"
        :style="
        `--el-menu-bg-color: ${sidebarVariables.menuBg};
        --el-menu-text-color: ${sidebarVariables.menuText};
        --el-menu-active-color: ${sidebarVariables.menuActiveText};`"
      >
        <SidebarItem
          v-for="menu in menus" :key="menu.path" :item="menu"
          :base-path="menu.path" :is-collapse="isCollapse" :icon-color="sidebarVariables.menuText"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SidebarItem from './Item.vue'
// import Logo from '../Logo/index.vue'
import { usePermissionStore } from '~/store/permission'
import { useAppStore } from '~/store/app'
import { useRoute } from 'vue-router'
import sidebarVariables from '~/styles/sidebar.module.scss'

const permissionStore = usePermissionStore()
const appStore = useAppStore()
const sidebar = computed(() => {
  return appStore.sidebar
})
const menus = computed(() => {
  return permissionStore.menus
})

const activeMenu = computed(() => {
  const { meta, path } = useRoute()
  if (meta !== null || meta !== undefined) {
    if (meta.activeMenu) {
      return meta.activeMenu + ''
    }
  }

  return path
})

const isCollapse = computed(() => {
  return !sidebar.value.opened
})
</script>
