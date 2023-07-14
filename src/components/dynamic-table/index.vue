<template>
  <div class="dynamic-table-wrapper">
    <div class="table-tool">
      <div class="table-tool-title">
        <span>{{ title }}</span>
        <span class="tips">{{ tips ? `提示：${tips}` : '' }}</span>
      </div>
      <div class="table-tool-btns">
        <el-button v-if="showState.batchAdd" title="批量添加" size="small" :icon="ZoomIn" @click="batchAdd">批量添加</el-button>
        <el-button v-if="showState.add" title="添加" size="small" :icon="CirclePlus" @click="add">添加</el-button>
        <el-button v-if="showState.del" title="删除" size="small" :icon="Remove" @click="del">删除</el-button>
        <el-button v-if="showState.clear" title="清空" size="small" :icon="Delete" @click="clear">清空</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="modelValue" v-bind="$attrs" class="dynamic-table" border fit highlight-current-row :row-key="rowKey" :row-class-name="rowClassName" @row-click="rowClick">
      <el-table-column v-if="check" type="selection" width="40" fixed="left" :selectable="canCheck" />
      <slot />
      <template #empty>
        <el-empty description="暂无数据~~" :image-size="50" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref, watch } from 'vue'
import { ElTable } from 'element-plus'
import { CirclePlus, Delete, Remove, ZoomIn } from '@element-plus/icons-vue'
import { useConfirm } from '~/hooks'

interface Props {
  modelValue?: any[]
  title?: string
  rowKey?: string
  default?: any
  tools?: string[]
  tips?: string
  check?: boolean
  canCheck?: (row: any, index: number) => boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  title: '',
  rowKey: 'id',
  default: {} as any,
  tools: () => ['add', 'del', 'clear'],
  check: false,
  canCheck: () => true,
})

const emits = defineEmits<{
  (e: 'update:modelValue', tableData: any[]): void
  (e: 'batch-add'): void
  (e: 'add'): void
  (e: 'del'): void
  (e: 'clear'): void
}>()

const tableRef = ref<InstanceType<typeof ElTable>>()
const state = reactive({
  tableData: [] as any[],
  currentRowIndex: 0 as number,
})
const showState = reactive({
  batchAdd: false,
  add: false,
  del: false,
  clear: false,
})

onMounted(() => {
  props.tools.forEach((tool) => {
    showState[tool] = true
  })
})

watch(
  () => props.modelValue,
  () => {
    state.tableData = props.modelValue

    // 数据赋值渲染需要耗费时间
    nextTick(() => {
      // 被禁用行数
      const disabledLength = document.querySelectorAll('.el-table__fixed .el-table__row .el-checkbox.is-disabled').length
      // 全部被禁用，设置全选复选框为禁用状态
      if (state.tableData.length === disabledLength && state.tableData.length !== 0) {
        // 添加is-disabled类
        document.querySelector('.el-table__fixed thead .el-table-column--selection .el-checkbox')?.classList.add('is-disabled')
        document.querySelector('.el-table__fixed thead .el-table-column--selection .el-checkbox .el-checkbox__input')?.classList.add('is-disabled')
        // 禁用复选框
        document.querySelector('.el-table__fixed thead .el-table-column--selection .el-checkbox input[type=checkbox]')?.setAttribute('disabled', 'disabled')
      }
    })
  }
)

const rowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
  row.index = rowIndex
  return ''
}

const rowClick = (row: any) => {
  state.currentRowIndex = row.index
}

const batchAdd = () => {
  emits('batch-add')
  emits('update:modelValue', state.tableData)
}

const add = () => {
  state.tableData.push(JSON.parse(JSON.stringify(props.default)))
  emits('add')
  emits('update:modelValue', state.tableData)
}

const del = () => {
  state.tableData.splice(state.currentRowIndex, 1)
  state.currentRowIndex = state.currentRowIndex > 0 ? state.currentRowIndex - 1 : 0
  tableRef.value?.setCurrentRow(state.tableData[state.currentRowIndex])
  emits('del')
  emits('update:modelValue', state.tableData)
}

const clear = () => {
  useConfirm({ message: '确定全部清空吗？' }).then(() => {
    state.tableData = []
    emits('clear')
    emits('update:modelValue', state.tableData)
  })
}

const refreshData = (filed: string, val: number) => {
  state.tableData.forEach((item: any) => {
    item[filed] = val
  })
}

defineExpose({
  refreshData,
})
</script>

<style lang="scss" scoped>
.dynamic-table-wrapper {
  width: 100%;

  .table-tool {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    display: block;
    background: #f5f5f5;

    .table-tool-title {
      font-size: 1.4rem;
      font-weight: 700;
      float: left;
    }

    .table-tool-btns {
      float: right;

      .btns-inline {
        display: inline-block;

        i {
          font-size: 1.2rem;
          font-weight: 700;
        }
      }

      > * {
        margin-left: 10px;
        cursor: pointer;
      }

      > *:hover {
        color: #0084ff;
      }
    }
  }

  .dynamic-table {
    // height: 400px;

    :deep(.el-table__body-wrapper) {
      height: 100%;
      overflow: auto;

      .el-form-item {
        margin-bottom: 0 !important;
      }

      .el-form-item__content {
        margin-left: 0 !important;
      }
    }
  }
}
</style>
