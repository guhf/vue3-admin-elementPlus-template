<template>
  <el-table
    :data="data"
    :height="tableHeight"
    :size="size"
    :row-key="rowKey"
    :tree-props="treeProps"
    default-expand-all
    border
    fit
    @sort-change="sortChange"
    @selection-change="selectionChange"
    @row-contextmenu="rightClick"
    @cell-click="cellClick"
    @select="select"
    @select-all="selectAll"
    @row-click="rowClick"
  >
    <el-table-column v-if="check" type="selection" width="40" :selectable="canCheck" />
    <slot />
    <template #empty>
      <el-empty description="暂无数据~~" />
    </template>
  </el-table>
  <TablePagination :hidden="!pagination" :total="total" :page-index="pageQuery.pageIndex" :page-size="pageQuery.pageSize" :page-sizes="pageSizes" :layout="layout" :background="background" :auto-scroll="autoScroll" @current-change="currentChange" @size-change="sizeChange" />
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import TablePagination from '@/components/pagination/index.vue'
// import { MouseMenuDirective as vMouseMenuDirective } from '@howdyjs/mouse-menu'
import { useSettingsStore } from '@/store/settings'

interface Props {
  data?: string[]
  height?: string
  size?: string
  rowKey?: string
  treeProps?: { hasChildren: string; children: string }
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
  data: () => {
    return []
  },
  height: 'calc(100vh - 301px)',
  size: '',
  rowKey: 'id',
  treeProps: () => {
    return { hasChildren: '', children: '' }
  },
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
  (e: 'selection-change', val: object): void
  (e: 'row-contextmenu', val: object): void
  (e: 'cell-click', val: object): void
  (e: 'select', selection: any, row: any): void
  (e: 'select-all', selection: any): void
  (e: 'row-click', row: any, column: any, event: any): void
}>()

const settingsStore = useSettingsStore()

const tableHeight = computed(() => {
  return `calc(${props.height} - ${settingsStore.showTagsView ? '34px' : '0px'})`
})

const pageQuery = reactive({
  pageIndex: props.pageIndex as number,
  pageSize: props.pageSize as number,
  orderBy: '' as string | undefined | null,
})

const reloadData = (pageIndex: number = 1, pageSize: number = pageQuery.pageSize) => {
  pageQuery.pageIndex = pageIndex
  pageQuery.pageSize = pageSize
  emits('reload', pageQuery)
}

const sortChange = ({ prop, order }: any) => {
  if (order != null) {
    pageQuery.orderBy = prop + ' ' + order.replace('ending', '')
  } else {
    delete pageQuery.orderBy
  }

  reloadData(1, pageQuery.pageSize)
}

const selectionChange = (val: object) => {
  emits('selection-change', val)
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
  index =
    props.data?.findIndex((item: any) => {
      return Number(item.id) === Number(row.id)
    }) ?? 0
  emits('cell-click', { field: String(index) + column.property })
}

const select = (selection: any, row: any) => {
  emits('select', selection, row)
}

const selectAll = (selection: any) => {
  emits('select-all', selection)
}

const rowClick = (row: any, column: any, event: any) => {
  emits('row-click', row, column, event)
}

defineExpose({
  reloadData,
})
</script>

<style scoped></style>
