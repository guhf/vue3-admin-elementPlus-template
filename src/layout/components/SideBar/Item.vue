<template>
  <div v-if="item.meta && !item.meta.hidden">
    <el-sub-menu v-if="item.meta.menuType === 1" :index="resolvePath(item.path)">
      <template #title>
        <SvgIcon v-if="item.meta.icon" :icon-name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title">
          {{ item.meta.title }}
        </span>
      </template>
      <template v-if="item.children">
        <sidebar-item v-for="child in item.children" :key="child.path" :item="child" :is-collapse="isCollapse" :is-first-level="false" :base-path="resolvePath(child.path)" class="nest-menu" />
      </template>
    </el-sub-menu>
    <sidebar-item-link v-else-if="item.meta.menuType === 2" :to="resolvePath(item.path)">
      <el-menu-item :index="resolvePath(item.path)">
        <SvgIcon v-if="item.meta.icon && !item.parentId" :icon-name="item.meta.icon" :class="{ 'mini-icon': item.parentId }" />
        <span v-if="item.meta.title">
          {{ item.meta.title }}
        </span>
      </el-menu-item>
    </sidebar-item-link>
  </div>
</template>

<script lang="ts" setup>
import SidebarItem from './Item.vue'
import SidebarItemLink from './ItemLink.vue'
import type { Route } from '~/models/route/routesModel'
import { isExternal } from '~/utils/validate'

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
        tagName: '',
      },
    }
  },
  isCollapse: false,
  isFirstLevel: false,
  basePath: '',
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

<style lang="scss">
.mini-icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
