<template>
  <div ref="tagsViewRef" class="tags-view-container">
    <ScrollPane ref="scrollPaneRef" class="tags-view-wrapper" :tag-list="state.itemRefs" @scroll="handleScroll">
      <router-link v-for="tag in visitedViews" :ref="setItemRef" :key="tag.path" :class="isActive(tag) ? 'active' : ''" :to="{ path: tag.path || '', query: tag.query }" class="tags-view-item" @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''" @contextmenu.prevent="openMenu(tag, $event)">
        {{ tag.title }}
        <el-icon v-show="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)">
          <close />
        </el-icon>
      </router-link>
    </ScrollPane>
    <ul v-show="state.visible" :style="{ left: state.left + 'px', top: state.top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(state.selectedTag)">
        {{ '刷新' }}
      </li>
      <li v-if="!isAffix(state.selectedTag)" @click="closeSelectedTag(state.selectedTag)">
        {{ '关闭' }}
      </li>
      <li @click="closeOthersTags">
        {{ '关闭其他' }}
      </li>
      <li @click="closeAllTags(state.selectedTag)">
        {{ '关闭所有' }}
      </li>
    </ul>
  </div>
</template>
// , fullPath: tag.fullPath, tagName: tag.meta?.tagName

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, onBeforeUpdate, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close } from '@element-plus/icons-vue'
import ScrollPane from './ScrollPane.vue'
import type { TagView } from '~/store/tagsView'
import type { Routes } from '~/models/route/routesModel'
import { useTagsViewStore } from '~/store/tagsView'
import { usePermissionStore } from '~/store/permission'

const tagsViewStore = useTagsViewStore()
const permissionStore = usePermissionStore()
const router = useRouter()
const currentRoute = useRoute()
const tagsViewRef = ref<ElRef>()
const scrollPaneRef = ref<ScrollPane>()

const toLastView = (visitedViews: TagView[], view: TagView) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView !== undefined && latestView.fullPath !== undefined) {
    router.push(latestView.fullPath).catch((err) => {
      console.warn(err)
    })
  } else {
    if (view.name === 'Dashboard') {
      router.push({ path: `/redirect${view.fullPath}` }).catch((err) => {
        console.warn(err)
      })
    } else {
      router.push('/').catch((err) => {
        console.warn(err)
      })
    }
  }
}

const state = reactive({
  visible: false,
  top: 0,
  left: 0,
  selectedTag: {} as TagView,
  affixTags: [] as TagView[],
  lastRouteName: '',
  itemRefs: [] as any[],
})

const isActive = (route: TagView) => {
  // return route.path === currentRoute.path
  return route.meta?.tagName === currentRoute.meta?.tagName
}

const isAffix = (tag: TagView) => {
  return tag.meta && tag.meta.affix
}

const refreshSelectedTag = (view: TagView) => {
  tagsViewStore.delCachedView(`${view.meta?.tagName}`)
  const { fullPath } = view

  nextTick(() => {
    router.replace(`/redirect${fullPath}`).catch((err) => {
      console.warn(err)
    })
  })
}

const closeSelectedTag = (view: TagView) => {
  tagsViewStore.delView(view)

  if (isActive(view)) {
    toLastView(tagsViewStore.visitedViews, view)
  }
}

const closeOthersTags = () => {
  if (state.selectedTag.fullPath !== currentRoute.path && state.selectedTag.fullPath !== undefined) {
    router.push(state.selectedTag.fullPath).catch((err) => {
      console.log(err)
    })
  }
  tagsViewStore.delOtherView(state.selectedTag as TagView)
}

const closeAllTags = (view: TagView) => {
  tagsViewStore.delAllViews()
  if (state.affixTags.some((tag) => tag.path === currentRoute.path)) {
    return
  }
  toLastView(tagsViewStore.visitedViews, view)
}

const openMenu = (tag: TagView, e: MouseEvent) => {
  const menuMinWidth = 105
  if (!tagsViewRef.value) return

  const offsetLeft = tagsViewRef.value?.getBoundingClientRect().left
  const offsetWidth = tagsViewRef.value?.offsetWidth
  const maxLeft = offsetWidth - menuMinWidth
  const left = e.clientX - offsetLeft + 15
  if (left > maxLeft) {
    state.left = maxLeft
  } else {
    state.left = left
  }
  state.top = e.clientY - 60 //减去顶部header固定高度
  state.visible = true
  state.selectedTag = tag
}

const closeMenu = () => {
  state.visible = false
}

const handleScroll = () => {
  closeMenu()
}

const setItemRef = (el: any) => {
  if (el && !state.itemRefs.includes(el)) {
    state.itemRefs.push(el)
  }
}

const visitedViews = computed(() => {
  return tagsViewStore.visitedViews
})

const routes = computed(() => permissionStore.routes)

const filterAffixTags = (routes: Routes, basePath = '/') => {
  let tags: TagView[] = []

  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // Record<string | number | symbol, unknown>
      const tagPath = `${basePath}/${route.path}`.replaceAll('///', '/').replaceAll('//', '/')
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta },
      })
    }

    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length >= 1) {
        tags = [...tags, ...childTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  state.affixTags = filterAffixTags(routes.value)
  for (const tag of state.affixTags) {
    if (tag.name) {
      tagsViewStore.addVisitedView(tag as TagView)
    }
  }
}

const addTags = () => {
  const tagName = currentRoute.meta.tagName as string

  if (tagName) {
    // if (tagName !== state.lastRouteName) {
    //   state.lastRouteName = tagName
    //   tagsViewStore.addCachedView(currentRoute)
    // }
    tagsViewStore.addCachedView(currentRoute)
  }
  return false
}

const moveToCurrentTag = () => {
  const tags = state.itemRefs as any[]

  nextTick(() => {
    if (tags === null || tags === undefined || !Array.isArray(tags)) {
      return
    }
    for (const tag of tags) {
      if (tag.to.tagName === currentRoute.meta.tagName) {
        scrollPaneRef.value?.moveToCurrentTag(tag)

        if ((tag.to as TagView).fullPath !== currentRoute.fullPath) {
          tagsViewStore.updateVisitedView(currentRoute)
        }
      }
    }
  })
}

watch(
  () => currentRoute.name,
  () => {
    if (currentRoute.name !== 'Login') {
      addTags()
      moveToCurrentTag()
    }
  }
)

watch(
  () => state.visible,
  (value) => {
    if (value) {
      document.body.addEventListener('click', closeMenu)
    } else {
      document.body.removeEventListener('click', closeMenu)
    }
  }
)

onBeforeMount(() => {
  initTags()
  addTags()
})

onBeforeUpdate(() => {
  state.itemRefs = []
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  padding: 5px 10px;
  background: #fff;
  border-top: 1px solid #eee;

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 25px;
      line-height: 23px;
      border: 1px solid rgba(124, 141, 181, 0.3);
      border-radius: 4px;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      box-sizing: border-box;

      &:first-of-type {
        margin-left: 0;
      }

      &.active,
      &:hover {
        background-color: $primary;
        color: #fff;
        transition: width 0.3s;
      }

      &:hover .el-icon-close {
        font-size: 14px;
        padding: 2px;
      }

      .el-icon-close {
        font-size: 0;
        vertical-align: -3px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s;
        transform-origin: 100% 50%;

        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }

        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
