<template>
  <div class="top-bar-wrap">
    <Logo :collapse="isCollapse" />
    <Tools />
  </div>

</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/app'
import Logo from '../Logo/index.vue'
import Tools from '../Tools/index.vue'

const appStore = useAppStore()

const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})

</script>

<style lang="scss" scoped>
  .top-bar-wrap{
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>