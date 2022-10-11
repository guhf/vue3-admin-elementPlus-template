<template>
  <const-dialog ref="treeDialogRef" :title="title" :width="width" :btns="btns"
    @confirm="mConfirm" @check="mCheck" @save="mSave" @close="mClose">
    <const-tree ref="constTreeRef" :data="treeData" :default-props="defaultProps" show-checkbox :radio="radio"></const-tree>
  </const-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { PermissionTree } from '@/models/sys/menuModel'

import ConstTree from '@/components/ConstTree/index.vue'
import { TreeData } from 'element-plus/es/components/tree/src/tree.type';

interface Props {
  title?: string
  width?: string | number
  btns?: string[]
  treeData?: PermissionTree
  radio?: boolean
  defaultProps?: {
    label: string,
    children: string
  }
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  btns: () => ['confirm'],
  treeData: () => [],
  radio: false,
})

const emits = defineEmits<{
  (e: 'confirm', data: TreeData): void
  (e: 'check', data: TreeData): void
  (e: 'save', data: TreeData): void
  (e: 'close'): void
}>()

const constTreeRef = ref<ConstTree>()
const treeDialogRef = ref<ConstDialog>()

const open = () => {
  treeDialogRef.value?.open()
}

const close = () => {
  treeDialogRef.value?.close()
}

const mConfirm = () => {
  let data =  constTreeRef.value?.getCheckData() || []
  emits('confirm', data)
}

const mCheck = () => {
  let data =  constTreeRef.value?.getCheckData() || []
  emits('check', data)
}

const mSave = () => {
  let data =  constTreeRef.value?.getCheckData() || []
  emits('save', data)
}

const mClose = () => {
  emits('close')
}

defineExpose({
  open,
  close
})
</script>

<style scoped>
</style>
