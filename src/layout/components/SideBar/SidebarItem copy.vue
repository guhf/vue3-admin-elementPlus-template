<template>
  <div v-if="(!item?.meta || !item.meta.hidden) && item.menuType === 1">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && (!theOnlyOneChild.children || theOnlyOneChild.children.length === 0)">
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)" :class="{ 'sub-menu-title-noDropdown': isFirstLevel }">
          <SvgIcon v-if="theOnlyOneChild.meta.icon" :icon-name="theOnlyOneChild.meta.icon" style="width: 1.5rem; height: 1.5rem" />
          <span v-if="theOnlyOneChild.meta.title">
            {{ theOnlyOneChild.meta.title }}
          </span>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import SidebarItemLink from './SidebarItemLink.vue'
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

const alwaysShowRootMenu = computed(() => {
  if (props.item.meta && props.item.meta.alwaysShow) {
    return true
  } else {
    return false
  }
})

const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      if (item.meta && item.meta.hidden) {
        return false
      } else {
        return true
      }
    })
    return showingChildren.length
  }
  return 0
})

const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  return { ...props.item }
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
