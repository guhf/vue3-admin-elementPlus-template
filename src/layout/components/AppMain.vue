<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
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
  height: 0;
  flex: 1;
  padding: 10px;
  position: relative;
  overflow: auto;
}
</style>
