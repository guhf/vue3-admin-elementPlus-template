<template>
  <div class="dynamic-table-warp">
    <div class="table-tool">
      <div class="table-tool-title">
        <span>{{ title }}</span>
      </div>
      <div class="table-tool-self">
        <div v-if="stateData.batchAddShow" class="self-inline" title="批量添加" @click="batchAdd"><i class="el-icon-zoom-in" />批量添加</div>
        <div v-if="stateData.addShow" class="self-inline" title="添加" @click="add"><i class="el-icon-circle-plus-outline" />添加</div>
        <div v-if="stateData.delShow" class="self-inline" title="删除" @click="del"><i class="el-icon-remove-outline" />删除</div>
        <div v-if="stateData.clearShow" class="self-inline" title="清空" @click="clear"><i class="el-icon-delete" />清空</div>
      </div>
    </div>
    <el-form ref="dynamicTable" :model="stateData" label-width="0">
      <el-table ref="tableRef" :data="stateData.tableData" class="dynamic-table" 
        border fit highlight-current-row :row-key="rowKey"
        :row-class-name="rowClassName" 
        @row-click="rowClick">
        <slot />
        <template #empty>
          <el-empty description="暂无数据~~" />
        </template>
      </el-table>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useConfirm } from '@/hooks/web/message'
import { ElTable, FormInstance } from 'element-plus'

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
  (e: 'batchAdd'): void
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
const dynamicTable = ref<FormInstance>()
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
  emits('batchAdd')
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
  stateData,
  dynamicTable,
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
    background: rgba(0, 132, 255, 0.1);

    .table-tool-title {
      font-size: 1.4rem;
      font-weight: 700;
      float: left;
    }

    .table-tool-self {
      float: right;

      .self-inline {
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

    .el-table__body-wrapper{
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
