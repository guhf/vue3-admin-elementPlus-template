<template>
  <div class="table-wrapper">
    <el-table ref="elTbRef" v-fit-column v-bind="$attrs" :height="tableHeight" :row-key="rowKey" border fit @sort-change="sortChange" @row-contextmenu="rightClick" @cell-click="cellClick">
      <el-table-column v-if="check" type="selection" :width="$attrs.showSummary ? 60 : 40" align="center" fixed="left" :selectable="canCheck" />
      <slot />
      <template #empty>
        <el-empty description="暂无数据~~" />
      </template>
    </el-table>
    <Pagination :hidden="!pagination" :total="total" :page-index="pageQuery.pageIndex" :page-size="pageQuery.pageSize" :page-sizes="pageSizes" :layout="layout" :background="background" :auto-scroll="autoScroll" @current-change="currentChange" @size-change="sizeChange" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onUpdated, reactive, ref, useAttrs } from 'vue'
import { ElTable } from 'element-plus'
import Pagination from '~/components/pagination/index.vue'
// import { MouseMenuDirective as vMouseMenuDirective } from '@howdyjs/mouse-menu'

interface Props {
  rowKey?: string | ((row: any) => string)
  check?: boolean
  canCheck?: (row: any, index: number) => boolean
  pagination?: boolean

  total?: number
  pageIndex?: number
  pageSize?: number
  pageSizes?: number[]
  layout?: string
  background?: boolean
  autoScroll?: boolean
  /** 右键菜单 */
  contextmenu?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rowKey: 'id',
  check: true,
  canCheck: () => true,
  pagination: true,
  total: 0,
  pageIndex: 1,
  pageSize: 20,
  pageSizes: () => [10, 20, 30, 50],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  autoScroll: true,
  contextmenu: false,
})

const emits = defineEmits<{
  (e: 'reload', pageQuery: object): void
  (e: 'row-contextmenu', val: object): void
  (e: 'cell-click', val: object): void
}>()

const $attrs = useAttrs()

const elTbRef = ref<InstanceType<typeof ElTable>>()
const pageQuery = reactive({
  pageIndex: props.pageIndex as number,
  pageSize: props.pageSize as number,
  orderBy: '' as string | undefined | null,
})

onUpdated(() => {
  elTbRef.value?.doLayout()
})

const tableHeight = computed(() => {
  return props.pagination ? 'calc(100% - 46px)' : '100%'
})

const reloadData = (pageIndex = 1, pageSize: number = pageQuery.pageSize) => {
  pageQuery.pageIndex = pageIndex
  pageQuery.pageSize = pageSize
  emits('reload', pageQuery)
}

const sortChange = ({ prop, order }: any) => {
  if (order != null) {
    pageQuery.orderBy = `${prop} ${order.replace('ending', '')}`
  } else {
    delete pageQuery.orderBy
  }

  reloadData(1, pageQuery.pageSize)
}

const currentChange = (index: number) => {
  reloadData(index, pageQuery.pageSize)
}

const sizeChange = (size: number) => {
  reloadData(1, size)
}

const rightClick = (row: any, column: any, event: any) => {
  // console.log(row);
  // console.log(column);
  // console.log(event);

  if (props.contextmenu) {
    // 关闭浏览器右键默认事件
    event.preventDefault()
  }
  emits('row-contextmenu', row)
}

const cellClick = (row: any, column: any) => {
  let index = 0
  const data = ($attrs.data as any[]) || []
  index =
    data.findIndex((item: any) => {
      return Number(item.id) === Number(row.id)
    }) ?? 0
  emits('cell-click', { field: String(index) + column.property })
}

const doLayout = () => {
  elTbRef.value?.doLayout()
}

defineExpose({
  reloadData,
  doLayout,
})
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  height: 0;
  flex: 1;
}

:deep(.el-table__inner-wrapper) {
  height: 100% !important;
}
</style>
