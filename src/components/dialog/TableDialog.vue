<template>
  <ConstDialog
    ref="tbDialogRef" :title="title" :width="width" :btns="btns"
    @confirm="mConfirm" @check="mCheck" @save="mSave" @close="mClose"
  >
    <ConstTable
      ref="tbRef"
      :stateData="state.pageListData" :total="state.total" :pageSize="state.pageQuery.pageSize" :canCheck="canCheck"
      @reload="reloadTableData" @selection-change="selectionChange"
      @select="select" @select-all="selectAll" @row-click="rowClick"
    >
      <slot />
    </ConstTable>
  </ConstDialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { PageQuery } from '~/models/common/pageQueryModel'

interface Props {
  title?: string
  width?: string | number
  btns?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  btns: () => ['confirm']
})

const emits = defineEmits<{
  (e: 'confirm', val: any): void
  (e: 'check', val: any): void
  (e: 'save', val: any): void
  (e: 'close'): void
}>()

const state = reactive({
  pageListData: [] as any[],
  total: 0 as number,
  pageQuery: {
    pageIndex: 1
  } as PageQuery,
  selectTableData: [] as any[]
})

const tbDialogRef = ref<ConstDialog>()

const open = () => {
  tbDialogRef.value?.open()
}

const close = () => {
  tbDialogRef.value?.close()
}

const mConfirm = (val: any) => {
  emits('confirm', val)
}

const mCheck = (val: any) => {
  emits('check', val)
}

const mSave = (val: any) => {
  emits('save', val)
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
