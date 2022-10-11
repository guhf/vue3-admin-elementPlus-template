<template>
  <el-scrollbar ref="scrollContainerRef" :vertical="false" class="scroll-container" @wheel.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ElScrollbar } from 'element-plus';

interface Props {
  tagList: any[]
}

const props = withDefaults(defineProps<Props>(), {
  tagList: () => []
})

const emits = defineEmits(['scroll'])

const scrollContainerRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollWrapper = computed(() => {
  return scrollContainerRef.value?.$refs.wrap$ as HTMLElement
})
const tagSpacing = 4

const handleScroll = (e: WheelEvent) => {
  const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
  scrollWrapper.value.scrollLeft = scrollWrapper.value.scrollLeft + eventDelta / 4
}

const moveToCurrentTag = (currentTag: HTMLElement) => {
  const container = scrollContainerRef.value?.$el
  const containerWidth = container.offsetWidth
  let fristTag = null
  let lastTag = null

  // find first tag and last tag
  if (props.tagList.length > 0) {
    fristTag = props.tagList[0]
    lastTag = props.tagList[props.tagList.length - 1]
  }

  if (fristTag === currentTag) {
    scrollWrapper.value.scrollLeft = 0
  } else if (lastTag === currentTag) {
    scrollWrapper.value.scrollLeft =
        scrollWrapper.value.scrollWidth - containerWidth
  } else {
    // find preTag and nextTag
    const currentIndex = props.tagList.findIndex((item) => item === currentTag)
    const prevTag = props.tagList[currentIndex - 1]
    const nextTag = props.tagList[currentIndex + 1]
    // the tag's offsetLeft after of nextTag
    const afterNextTagOffsetLeft =
        nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagSpacing
    // the tag's offsetLeft before of prevTag
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagSpacing

    if (
      afterNextTagOffsetLeft >
        scrollWrapper.value.scrollLeft + containerWidth
    ) {
      scrollWrapper.value.scrollLeft =
          afterNextTagOffsetLeft - containerWidth
    } else if (beforePrevTagOffsetLeft < scrollWrapper.value.scrollLeft) {
      scrollWrapper.value.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

const emitScroll = () => {
  emits('scroll')
}

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

defineExpose({
  moveToCurrentTag
})
</script>

<style lang="scss" scoped>
.scroll-container {
  .el-scrollbar__bar {
    bottom: 0px;
  }

  .el-scrollbar__wrap {
    height: 49px;
  }
}
</style>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
}
</style>
