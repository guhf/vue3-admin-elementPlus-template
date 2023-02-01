<template>
  <div class="operation-element">
    <el-input v-if="input" v-model="inputValue" type="text" class="icon-input" :placeholder="placeholder" disabled>
      <template #append>
        <el-button :icon="Search" @click="openDialog" />
      </template>
    </el-input>
    <el-button v-else-if="button" type="primary" :icon="btnIcon" :size="btnSize" @click="openDialog">{{ btnText }}</el-button>
    
    <ConstDialog ref="treeDialogRef" v-model="modelValue" :title="title" :width="width" :btns="btns"
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
  modelValue?: boolean
  placeholder?: string
  input?: boolean
  inputValue?: string
  button?: boolean
  btnText?: string
  btnIcon?: DefineComponent
  btnSize?: "" | "default" | "small" | "large"
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
  modelValue: false,
  placeholder: '请输入',
  btnSize: 'small',
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
  (e: 'open'): void
  (e: 'close'): void
}>()

const constTreeRef = ref<ConstTree>()
let treeData = ref<Tree>([])
let showTree = ref(false)

const openDialog = () => {
  emits('open')
  open()
}

const open = () => {
  emits('update:modelValue', true)
  props.load && props.load(props.loadParams).then((res: Response<Tree>) => {
    if (res.data) {
      treeData.value = res.data
      showTree.value = true
      console.log(treeData.value);
      console.log(showTree.value);
    }
  })
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
  emits('update:modelValue', false)
}

watch(() => props.data, (newVal: Tree) => {
  treeData.value = newVal
})
</script>

<style scoped>
.operation-element{
  display: inline-flex;
  vertical-align: middle;
  margin: 0 15px;
}
</style>
