<template>
  <a v-if="isExternal(to || '')" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { isExternal } from '~/utils/validate'
import { useRouter } from 'vue-router'

interface Props {
  to: string
}

const props = withDefaults(defineProps<Props>(), {
  to: ''
})

const router = useRouter()

const push = () => {
  router.push({
    path: props.to
  }).catch((error) => {
    console.error('当前路由页面不存在', error)
    // router.push({
    //   path: '404'
    // })
  })
}
</script>
