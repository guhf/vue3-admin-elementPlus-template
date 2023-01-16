<template>
  <div class="operation-element">
    <el-input v-if="input" v-model="modelValue" type="text" class="icon-input" :placeholder="placeholder" disabled>
      <template #append>
        <el-button :icon="Search" @click="openDialog" />
      </template>
    </el-input>
    <el-button v-else-if="button" type="primary" :icon="btnIcon" :size="btnSize" @click="openDialog">{{ btnText }}</el-button>
    
    <ConstDialog ref="treeDialogRef" :title="title" :width="width" :btns="btns"
      @confirm="mConfirm" @check="mCheck" @save="mSave" @close="mClose">
      <ConstTree ref="constTreeRef" :data="treeData" :default-props="defaultProps" show-checkbox :radio="radio"></ConstTree>
    </ConstDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, DefineComponent } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { TreeData } from 'element-plus/es/components/tree/src/tree.type'; 
import { Tree } from '@/models/common/treeModel';
import { Response } from '@/models/response'

import ConstTree from '@/components/ConstTree/index.vue'

interface Props {
  modelValue?: string | number | null
  placeholder?: string
  input?: boolean
  button?: boolean
  btnText?: string
  btnIcon?: DefineComponent | null
  btnSize?: string
  title?: string
  width?: string | number
  btns?: string[]
  data?: Tree
  radio?: boolean
  defaultProps?: {
    label: string,
    children: string
  }
  load?: (params: any) => Promise<Response<Tree>>
  loadParams?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '请输入',
  btnIcon: null,
  title: '',
  width: '50%',
  btns: () => ['confirm'],
  data: () => [],
  radio: false,
})

const emits = defineEmits<{
  (e: 'confirm', data: TreeData): void
  (e: 'check', data: TreeData): void
  (e: 'save', data: TreeData): void
  (e: 'open'): void
  (e: 'close'): void
}>()

const constTreeRef = ref<ConstTree>()
const treeDialogRef = ref<ConstDialog>()
let treeData = ref<Tree>()

const openDialog = () => {
  open()
  emits('open')
}

const open = () => {
  treeDialogRef.value?.open()
  props.load && props.load(props.loadParams).then((res: Response<Tree>) => {
    if (res.data) {
      treeData.value = res.data
    }
  })
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

watch(() => props.data, (newVal: Tree) => {
  treeData.value = newVal
})

defineExpose({
  open,
  close
})
</script>

<style scoped>
.operation-element{
  display: inline-flex;
  vertical-align: middle;
  margin: 0 15px;
}
</style>
