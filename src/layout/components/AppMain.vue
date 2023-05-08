<template>
  <section class="app-main">
    <router-view v-slot="{Component, route}">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="(tagsViewStore.cachedViews as string[])">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts" setup>
import { useTagsViewStore } from '~/store/tagsView'

const tagsViewStore = useTagsViewStore()

</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  /* 110 = header + navbar = 60 + 50 */
  height: calc(100vh - 110px);
  padding: 10px;
  position: relative;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 144 = header + navbar + tags-view = 60 + 50 + 34 */
    height: calc(100vh - 144px);
  }
}
  
</style>
