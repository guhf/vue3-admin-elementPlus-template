<template>
  <CommonDialog ref="tbDialogRef" :title="title" :width="width" :btns="btns" @confirm="handleConfirm" @check="handleCheck" @save="handleSave" @close="handleClose">
    <CommonTable ref="tbRef" :state-data="state.pageListData" :total="state.total" :page-size="state.pageQuery.pageSize" :can-check="canCheck" @reload="reloadTableData" @selection-change="selectionChange" @select="select" @select-all="selectAll" @row-click="rowClick">
      <slot />
    </CommonTable>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { PageQuery } from '~/models/common/pageQueryModel'

interface Props {
  title?: string
  width?: string | number
  btns?: string[]
}

withDefaults(defineProps<Props>(), {
  title: '',
  width: '50%',
  btns: () => ['confirm'],
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
    pageIndex: 1,
  } as PageQuery,
  selectTableData: [] as any[],
})

const tbDialogRef = ref<CommonDialog>()

const open = () => {
  tbDialogRef.value?.open()
}

const close = () => {
  tbDialogRef.value?.close()
}

const handleConfirm = (val: any) => {
  emits('confirm', val)
}

const handleCheck = (val: any) => {
  emits('check', val)
}

const handleSave = (val: any) => {
  emits('save', val)
}

const handleClose = () => {
  emits('close')
}

defineExpose({
  open,
  close,
})
</script>

<style scoped></style>
