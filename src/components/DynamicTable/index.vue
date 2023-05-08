<template>
  <div class="dynamic-table-warp">
    <div class="table-tool">
      <div class="table-tool-title">
        <span>{{ title }}</span>
      </div>
      <div class="table-tool-btns">
        <el-button v-if="stateData.batchAddShow" title="批量添加" size="small" :icon="ZoomIn" @click="batchAdd">批量添加</el-button>
        <el-button v-if="stateData.addShow" title="添加" size="small" :icon="CirclePlus" @click="add">添加</el-button>
        <el-button v-if="stateData.delShow" title="删除" size="small" :icon="Remove" @click="del">删除</el-button>
        <el-button v-if="stateData.clearShow" title="清空" size="small" :icon="Delete" @click="clear">清空</el-button>
      </div>
    </div>
    <el-table ref="tableRef" :data="modelValue" class="dynamic-table" 
      border fit highlight-current-row :row-key="rowKey"
      :row-class-name="rowClassName" 
      @row-click="rowClick">
      <slot />
      <template #empty>
        <el-empty description="暂无数据~~" />
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { ElTable } from 'element-plus'
import { ZoomIn, CirclePlus, Remove, Delete } from '@element-plus/icons-vue'
import { useConfirm } from '~/hooks'

interface Props {
  title?: string
  modelValue?: any[]
  rowKey?: string
  default?: any
  tools?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  modelValue: () => [],
  rowKey: 'id',
  default: {} as any,
  tools: () => ['add', 'del', 'clear']
})

const emits = defineEmits<{
  (e: 'update:modelValue', tableData: any[]): void
  (e: 'batch-add'): void
  (e: 'add'): void
  (e: 'del'): void
  (e: 'clear'): void
}>()

const stateData = reactive({
  tableData: [] as any[],
  currentRowIndex: 0 as number,
  batchAddShow: false,
  addShow: false,
  delShow: false,
  clearShow: false
}) as any
const tableRef = ref<InstanceType<typeof ElTable>>()

onMounted(() => {
  props.tools.forEach(item => {
    stateData[item + 'Show'] = true
  })
})

watch(() => props.modelValue, () => {
  stateData.tableData = props.modelValue
})

const rowClassName = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
  row.index = rowIndex
  return ''
}

const rowClick = (row: any) => {
  stateData.currentRowIndex = row.index
}

const batchAdd = () => {
  emits('batch-add')
  emits('update:modelValue', stateData.tableData)
}

const add = () => {
  stateData.tableData.push(JSON.parse(JSON.stringify(props.default)))
  emits('add')
  emits('update:modelValue', stateData.tableData)
}

const del = () => {
  stateData.tableData.splice(stateData.currentRowIndex, 1)
  stateData.currentRowIndex = stateData.currentRowIndex > 0 ? stateData.currentRowIndex - 1 : 0
  tableRef.value?.setCurrentRow(stateData.tableData[stateData.currentRowIndex])
  emits('del')
  emits('update:modelValue', stateData.tableData)
}

const clear = () => {
  useConfirm({ message: '确定全部清空吗？' }).then(() => {
    stateData.tableData = []
    emits('clear')
    emits('update:modelValue', stateData.tableData)
  })
}

const refreshData = (filed: string, val: number) => {
  stateData.tableData.forEach((item: any) => {
    item[filed] = val
  })
}

defineExpose({
  refreshData
})
</script>

<style lang="scss" scoped>
.dynamic-table-warp {
  width: 100%;
  
  .table-tool {
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    display: block;
    background: #f5f5f5;;

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
  
  .dynamic-table{
    // height: 400px;

    ::v-deep(.el-table__body-wrapper){
      height: 100%;
      overflow: auto;

      .el-form-item {
        margin-bottom: 0 !important;
      }
      
      .el-form-item__content{
        margin-left: 0 !important;
      }
    }
  }
}
</style>
