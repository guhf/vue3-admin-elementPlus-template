<template>
  <el-tree
    ref="treeRef" :data="data" :props="{...defaultProps, class: customerClassName}" 
    highlight-current :show-checkbox="showCheckbox" :check-strictly="radio" :default-checked-keys="defaultCheckedKeys"
    node-key="id" :filter-node-method="filterTree"
    @check-change="nodeChange"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElTree } from 'element-plus'
import type { TreeData, TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import type Node from 'element-plus/es/components/tree/src/model/node';

interface Props {
  data?: TreeData
  radio?: boolean
  defaultProps?: any
  showCheckbox?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  radio: false,
  defaultProps: {
    label: 'label',
    children: 'children',
  },
  showCheckbox: false
})

const treeRef = ref<InstanceType<typeof ElTree>>()
const checkedKeys = ref<string[]>([])

const customerClassName = (data: TreeNodeData) => {
  if(props.radio){
    if((data.children || []).length > 0){
      return 'radio-node no-checkbox-node'
    }else{
      return 'radio-node'
    }
  }
}

const defaultCheckedKeys = computed(() => {
  return Array.from(new Set(getCheckedKeys(props.data)))
})

const getCheckedKeys = (data: TreeData) => {
  data.forEach((item: TreeNodeData) => {
    if((item.children || []).length > 0){
      checkedKeys.value.concat(getCheckedKeys(item.children))
    }
    if(item.checked && (item.children || []).length === (item.children || []).filter((item: TreeNodeData) => { return item.checked === true }).length){
      checkedKeys.value.push(item.id)
    }
  })
  return checkedKeys.value
}

const filterTree = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data.label.includes(value)
}

const nodeChange = (data: Node, checked: boolean) => {
  if (checked && props.radio) {
    treeRef.value?.setCheckedNodes([data])
  }
}

const getCheckData = () => {
  let data = treeRef.value?.getCheckedNodes()
  return data
}

defineExpose({
  getCheckData
})
</script>

<style lang="scss" scoped>

::v-deep(.no-checkbox-node) {
  & > .el-tree-node__content {
    .el-checkbox {
      // display: none;
    }
  }
}

::v-deep(.radio-node) {
  .el-checkbox__inner {
    border-radius: 50%;
  }

}
</style>
