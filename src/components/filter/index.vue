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
import emitter from '~/utils/emitt'

const emits = defineEmits<{
  (e: 'search', pageQuery: object): void
  (e: 'reset', val: object): void
}>()

const slots = useSlots()

let more = ref(false)
let itemNum = ref<number>(0)
let drawerVisible = ref(false)
const moreTitle = '更多筛选'

const vNodes = computed(() => {
  return (slots as any).default()
})

onMounted(() => {
  setItemNum()
})

window.addEventListener('resize', () => {
  setItemNum()
})

const setItemNum = () => {
  const filterWidth = (document.querySelector('.filter-container') as HTMLElement)?.offsetWidth

  if (filterWidth > 0 && filterWidth <= 310) {
    itemNum.value = 1
  }
  if (filterWidth > 310 && filterWidth <= 620) {
    itemNum.value = 2
  }
  if (filterWidth > 620 && filterWidth <= 930) {
    itemNum.value = 3
  }
  if (filterWidth > 930 && filterWidth <= 1240) {
    itemNum.value = 4
  }
  if (filterWidth > 1240 && filterWidth <= 1550) {
    itemNum.value = 5
  }
  if (filterWidth > 1550 && filterWidth <= 1860) {
    itemNum.value = 6
  }

  if (vNodes.value.length > itemNum.value) {
    more.value = true
  } else {
    itemNum.value = vNodes.value.length
    more.value = false
  }

  nextTick(() => {
    emitter.emit('setFilterItemNum', itemNum.value)
  })
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
