<template>
  <ElConfigProvider :locale="state.locale">
    <router-view />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const state = reactive({
  locale: zhCn
})

// // 监听浏览器原生回退事件
// if (window.history && window.history.pushState) {
//   history.pushState(null, null, document.URL);
//   window.addEventListener('popstate', () => {
//     if (!localGet('token')) {
//       state.showMenu = false
//     }
//   }, false);
// }
</script>
