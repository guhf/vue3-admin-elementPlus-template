<template>
  <div class="sideWrap">
    <Logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        mode="vertical">
        <SidebarItem
          v-for="menu in menus" :key="menu.path" :item="menu"
          :base-path="menu.path" :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SidebarItem from './Item.vue'
import Logo from '../Logo/index.vue'
import { usePermissionStore } from '~/store/permission'
import { useAppStore } from '~/store/app'
import { useRoute } from 'vue-router'

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

<style lang="scss">
.sidebar-container {
  height: 100%;
  width: 100%;
  background-color: $subMenuBg !important;
  overflow: hidden;
  transition: width .5s;

  // reset element css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .el-scrollbar {
    height: 100%;
    padding: 0 10px;
  }

  &.has-logo {
    .el-scrollbar {
      height: calc(100% - 50px);
    }
  }
  
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .is-horizontal {
    display: none;
  }

  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }

  .svg-icon {
    margin-right: 10px;
    flex-shrink: 0;
  }

  .el-menu {
    border: none;
    height: 100%;
    width: 100% !important;
  }

  // menu hover
  // .sub-menu-title-noDropdown, .el-sub-menu__title {
  //   &:hover {
  //     background-color: $subMenuHoverBg !important;
  //   }
  // }

  .el-sub-menu__title, .el-sub-menu .el-menu-item{
    height: 40px;
    border-radius: 8px;
  }

  .is-active>.el-sub-menu__title {
    background-color: $subMenuActiveBg !important;
    color: $subMenuActiveText !important;
  }

  & .nest-menu .el-sub-menu>.el-sub-menu__title, & .el-sub-menu .el-menu-item {
    background-color: $menuItemBg !important;

    &:hover {
      background-color: $menuItemHoverBg !important;
    }

    &.is-active{
      background-color: $menuItemActiveBg !important;
    }
  }
}

.hideSidebar {
  .el-sub-menu {
    overflow: hidden;

    &>.el-sub-menu__title {
      padding: 0 !important;

      .svg-icon {
        margin-left: 10px;
      }

      .el-sub-menu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-sub-menu {
      &>.el-sub-menu__title {
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}

// when menu collapsed
.el-menu--vertical {
  &>.el-menu {
    .svg-icon {
      margin-right: 10px;
    }
    .sub-el-icon {
      margin-right: 10px;
      margin-left: -2px;
    }
  }

  .nest-menu .el-sub-menu>.el-sub-menu__title, .el-menu-item {
    height: 40px;

    &:hover {
      background-color: $menuItemHoverBg !important;
    }

    &.is-active{
      color: $menuItemActiveText;
      background-color: $menuItemActiveBg !important;
    }
  }

  >.el-menu--popup {
    max-height: 100vh;
    // 暂时屏蔽，否则会出现滚动条
    // overflow-y: auto;
    padding: 0;
    min-width: 150px;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>
