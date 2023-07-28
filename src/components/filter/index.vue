<template>
  <div ref="filterRef" class="filter-wrapper" tabindex="180429">
    <div ref="filterToolRef" class="filter-tool">
      <div class="filter-container">
        <slot />
      </div>
      <div class="filter-btns">
        <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
        <el-button class="btn-item" :icon="RefreshRight" @click="reset">重置</el-button>
        <el-button v-if="more" class="btn-item" type="warning" @click="openMore">更多筛选</el-button>
      </div>
    </div>
  </div>

  <el-drawer ref="drawerRef" v-model="drawerVisible" direction="rtl" :size="400" destroy-on-close>
    <template #header>
      <span>{{ moreTitle }}</span>
    </template>
    <div class="filter-container">
      <slot />
    </div>
    <template #footer>
      <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
      <el-button class="btn-item" :icon="RefreshRight" @click="reset">重置</el-button>
      <el-button class="btn-item" :icon="CircleClose" @click="closeMore">取消</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, useSlots } from 'vue'
import { CircleClose, RefreshRight, Search } from '@element-plus/icons-vue'
import type { VNode } from 'vue'

const emits = defineEmits<{
  (e: 'search', pageQuery: object): void
  (e: 'reset', val: object): void
}>()

const moreTitle = '更多筛选'
const slots = useSlots()
let more = ref(false)
let drawerVisible = ref(false)

const vNodes = computed(() => {
  const vNodes: VNode[] = (slots as any).default()
  return vNodes
})

onMounted(() => {
  setItemNum()
})

window.addEventListener('resize', () => {
  setItemNum()
})

const setItemNum = () => {
  let num = 2
  const innerWidth = window.innerWidth

  if (innerWidth > 767 && innerWidth <= 1200) {
    num = 2
  }
  if (innerWidth > 1200 && innerWidth <= 1400) {
    num = 3
  }
  if (innerWidth > 1400 && innerWidth <= 1600) {
    num = 4
  }
  if (innerWidth > 1600 && innerWidth <= 1920) {
    num = 5
  }
  if (innerWidth > 1920 && innerWidth <= 2500) {
    num = 6
  }
  if (innerWidth > 2500 && innerWidth <= 3000) {
    num = 7
  }

  console.log(11111, useSlots())

  vNodes.value.forEach((node) => {
    node.props!.num = num
    ;(node.type as any).render()
    console.log(22222, node)
  })

  if (vNodes.value.length > num) {
    more.value = true
  } else {
    more.value = false
  }
}

const openMore = () => {
  drawerVisible.value = true
}

const closeMore = () => {
  drawerVisible.value = false
}

const filter = (val: object) => {
  drawerVisible.value = false
  emits('search', val)
}

const reset = (val: object) => {
  emits('reset', val)
}
</script>

<style lang="scss" scoped>
.filter-wrapper {
  width: 100%;
  height: 34px;
  margin-bottom: 10px;

  .filter-tool {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #ffffff;

    .filter-container {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      overflow: hidden;

      :deep(.el-input-group__prepend) {
        padding: 0 10px;
      }
    }

    .filter-btns {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}

.el-drawer__body .filter-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  :deep(.filter-item) {
    width: 100% !important;
    margin-top: 20px;
  }
}
</style>
