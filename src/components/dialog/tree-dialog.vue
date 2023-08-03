<template>
  <CommonDialog ref="treeDialogRef" v-model="dialogVisible" :title="title" :width="width" :btns="btns" @confirm="handleConfirm" @check="handleCheck" @save="handleSave" @close="handleClose">
    <Tree ref="treeRef" :data="treeData" :default-props="defaultProps" show-checkbox :radio="radio" />
  </CommonDialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import type { TreeData } from 'element-plus/es/components/tree/src/tree.type'
import type { Response } from '~/models/response'
import type { Tree as TreeModel } from '~/models/common/treeModel'

import Tree from '~/components/tree/index.vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  btns?: string[]
  data?: TreeModel
  radio?: boolean
  defaultProps?: {
    label: string
    children: string
  }
  load?: Promise<Response<TreeModel>>
  loadParams?: any
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  btns: () => ['confirm'],
  data: () => [],
  radio: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', newValue: boolean): void
  (e: 'confirm', data: TreeData): void
  (e: 'check', data: TreeData): void
  (e: 'save', data: TreeData): void
  (e: 'close'): void
}>()

const treeRef = ref<Tree>()
let treeData = ref<TreeModel>([])

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

watch(
  () => props.modelValue,
  () => {
    if (props.modelValue) {
      // 先置空，否则回显选中状态时有bug
      treeData.value = []
      props.load &&
        props.load.then((res: Response<TreeModel>) => {
          if (res.data) {
            treeData.value = res.data
          }
        })
    }
  }
)

const handleConfirm = () => {
  let data = treeRef.value?.getCheckData() || []
  emits('confirm', data)
}

const handleCheck = () => {
  let data = treeRef.value?.getCheckData() || []
  emits('check', data)
}

const handleSave = () => {
  let data = treeRef.value?.getCheckData() || []
  emits('save', data)
}

const handleClose = () => {
  emits('close')
  emits('update:modelValue', false)
}

watch(
  () => props.data,
  (newVal: TreeModel) => {
    treeData.value = newVal
  }
)
</script>
