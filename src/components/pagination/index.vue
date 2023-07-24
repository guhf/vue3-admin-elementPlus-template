<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination :layout="layout" :background="background" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes || []" :total="total" @current-change="currentChange" @size-change="sizeChange" />
  </div>
</template>

<script lang="ts" setup>
// TODO 从其它文件进行类型导入 https://github.com/vuejs/core/issues/4294
interface Props {
  total?: number
  pageIndex?: number
  pageSize?: number
  pageSizes?: number[]
  layout?: string
  background?: boolean
  autoScroll?: boolean
  hidden?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  total: 10,
  pageIndex: 1,
  pageSize: 20,
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  hidden: false,
})

const emit = defineEmits<{
  (e: 'size-change', size: number): void
  (e: 'current-change', index: number): void
}>()

const currentChange = (index: number) => {
  emit('current-change', index)
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}

const sizeChange = (size: number) => {
  emit('size-change', size)
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding-top: 10px;
}

.pagination-container.hidden {
  display: none;
}
</style>
