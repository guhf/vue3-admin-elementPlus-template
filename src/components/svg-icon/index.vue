<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>
<script lang="ts" setup>
import { computed } from 'vue'

interface Props{
  iconName: string | null
  className?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconName: '',
  className: '',
  color: ''
})

// 图标在 iconfont 中的名字
const iconClassName = computed(() => {
  return `#${props.iconName}`
})

// 给图标添加上类名
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${props.className}`
  }
  return 'svg-icon'
})
</script>

<style scoped>
.svg-icon {
  width: 2rem;
  height: 2rem;
  position: relative;
  fill: currentColor;
  vertical-align: -.15em;
}
</style>
