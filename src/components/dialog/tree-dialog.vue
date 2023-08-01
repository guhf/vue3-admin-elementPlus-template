<template>
  <div class="operation-element">
    <el-input v-if="input" v-model="inputValue" type="text" class="icon-input" :placeholder="placeholder" disabled>
      <template #append>
        <el-button :icon="Search" @click="openDialog" />
      </template>
    </el-input>
    <el-button v-else-if="button" type="primary" :icon="btnIcon" :size="btnSize" @click="openDialog">{{ btnText }}</el-button>

    <CommonDialog ref="treeDialogRef" v-model="dialogVisible" :title="title" :width="width" :btns="btns" @confirm="handleConfirm" @check="handleCheck" @save="handleSave" @close="handleClose">
      <ConstTree ref="constTreeRef" :data="treeData" :default-props="defaultProps" show-checkbox :radio="radio" />
    </CommonDialog>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { TreeData } from 'element-plus/es/components/tree/src/tree.type'
import type { DefineComponent } from 'vue'
import type { Tree } from '~/models/common/treeModel'
import type { Response } from '~/models/response'

import ConstTree from '~/components/tree/index.vue'

interface Props {
  modelValue?: string
  placeholder?: string
  input?: boolean
  button?: boolean
  btnText?: string
  btnIcon?: DefineComponent
  btnSize?: '' | 'default' | 'small' | 'large'
  dialogVisible: boolean
  title?: string
  width?: string | number
  btns?: string[]
  data?: Tree
  radio?: boolean
  defaultProps?: {
    label: string
    children: string
  }
  load?: (params: any) => Promise<Response<Tree>>
  loadParams?: any
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入',
  btnSize: 'small',
  dialogVisible: false,
  title: '',
  width: '50%',
  btns: () => ['confirm'],
  data: () => [],
  radio: false,
})

const emits = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
  (e: 'update:dialogVisible', newValue: boolean): void
  (e: 'confirm', data: TreeData): void
  (e: 'check', data: TreeData): void
  (e: 'save', data: TreeData): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const constTreeRef = ref<ConstTree>()
let treeData = ref<Tree>([])
let showTree = ref(false)

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value || '')
  },
})

const dialogVisible = computed({
  get() {
    return props.dialogVisible
  },
  set(value) {
    emits('update:dialogVisible', value)
  },
})

const openDialog = () => {
  emits('open')
  open()
}

const open = () => {
  emits('update:dialogVisible', true)
  props.load &&
    props.load(props.loadParams).then((res: Response<Tree>) => {
      if (res.data) {
        treeData.value = res.data
        showTree.value = true
        console.log(treeData.value)
        console.log(showTree.value)
      }
    })
}

const handleConfirm = () => {
  let data = constTreeRef.value?.getCheckData() || []
  emits('confirm', data)
}

const handleCheck = () => {
  let data = constTreeRef.value?.getCheckData() || []
  emits('check', data)
}

const handleSave = () => {
  let data = constTreeRef.value?.getCheckData() || []
  emits('save', data)
}

const handleClose = () => {
  emits('close')
  emits('update:dialogVisible', false)
}

watch(
  () => props.data,
  (newVal: Tree) => {
    treeData.value = newVal
  }
)
</script>

<style scoped>
.operation-element {
  display: inline-flex;
  vertical-align: middle;
  margin: 0 15px;
}
</style>
