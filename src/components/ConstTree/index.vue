<template>
  <!-- <el-input type="text" v-model="keyWord" class="filter-input" placeholder="请输入关键字"></el-input> -->
  <el-input type="text" v-model="keyWord" class="filter-input" placeholder="请输入关键字" @keyup.enter="searchTree" @clear="searchTree">
    <template #append>
      <el-button :icon="Search" @click="searchTree" />
    </template>
  </el-input>
  <el-tree
    ref="treeRef" :data="data" :props="{...defaultProps, class: customerClassName}" 
    highlight-current :show-checkbox="showCheckbox" :check-strictly="radio" :default-checked-keys="defaultCheckedKeys"
    node-key="id" :filter-node-method="filterTree"
    @check-change="nodeChange"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { ElTree } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { Search } from '@element-plus/icons-vue';
import { Tree, TreeItem } from '@/models/common/treeModel';

interface Props {
  data?: Tree
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

const keyWord = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const checkedKeys = ref<string[]>([])

const customerClassName = (data: TreeItem) => {
  if(props.radio){
    if((data.children || []).length > 0){
      return 'radio-node no-checkbox-node'
    }else{
      return 'radio-node'
    }
  }
}

// watch(keyWord, (val: string) => {
//   treeRef.value!.filter(val)
// })
const searchTree = () => {
  treeRef.value!.filter(keyWord.value)
}

const defaultCheckedKeys = computed(() => {
  return Array.from(new Set(getCheckedKeys(props.data)))
})

const getCheckedKeys = (data: Tree) => {
  data.forEach((item: TreeItem) => {
    if(item.children && (item.children || []).length > 0){
      checkedKeys.value.concat(getCheckedKeys(item.children))
    }
    if(item.checked && (item.children || []).length === (item.children || []).filter((item: TreeItem) => { return item.checked === true }).length){
      checkedKeys.value.push(item.id)
    }
  })
  return checkedKeys.value
}

const filterTree = (value: string, data: TreeItem) => {
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
.filter-input{
  margin-bottom: 5px;
}

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
