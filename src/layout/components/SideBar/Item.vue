<template>
  <div v-if="(item.meta && !item.meta.hidden)">
    <el-sub-menu v-if="item.menuType === 1" :index="resolvePath(item.path)">
      <template #title>
        <svg-icon v-if="item.meta.icon" :iconName="item.meta.icon" />
        <span v-if="item.meta && item.meta.title">
          {{ item.meta.title }}
        </span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children" :key="child.path" :item="child"
          :is-collapse="isCollapse" :is-first-level="false" :base-path="resolvePath(child.path)" class="nest-menu"
        />
      </template>
    </el-sub-menu>
    <sidebar-item-link v-else-if="item.menuType === 2" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)">
        <svg-icon v-if="item.meta.icon" :iconName="item.meta.icon" style="width: 1.5rem; height: 1.5rem;" />
        <span v-if="item.meta.title">
          {{ item.meta.title }}
        </span>
      </el-menu-item>
    </sidebar-item-link>
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from '@/utils/validate'
import SidebarItem from './Item.vue'
import SidebarItemLink from './ItemLink.vue'

import { Route } from '@/models/route/routesModel'

interface Props {
  item: Route
  isCollapse?: boolean
  isFirstLevel?: boolean
  basePath: string
}

const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {
      id: '',
      name: '',
      path: '',
      component: '',
      authority: '',
      meta: {
        title: '',
        tagName: ''
      }
    }
  },
  isCollapse: false,
  isFirstLevel: false,
  basePath: ''
})

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }

  if (isExternal(props.basePath)) {
    return props.basePath
  }

  return (routePath ?? '').replaceAll('//', '/')
  // return (props.basePath + '/' + routePath).replaceAll('//', '/') //path.resolve(props.basePath, routePath)
}
</script>
