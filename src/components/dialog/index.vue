<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" draggable append-to-body destroy-on-close @close="mClose">
    <slot />

    <template #footer>
      <el-button v-if="state.confirmShow" type="primary" size="small" :icon="Checked" @click="mConfirm">确定</el-button>
      <el-button v-if="state.checkShow" type="primary" size="small" :icon="CircleCheck" @click="mCheck">选择</el-button>
      <el-button v-if="state.saveShow" type="primary" size="small" :icon="Checked" @click="mSave">保存</el-button>
      <el-button v-if="state.importShow" type="primary" size="small" :icon="Checked" @click="mImport">导入</el-button>
      <el-button type="info" size="small" :icon="CircleClose" @click="mClose">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue'
import { Checked, CircleCheck, CircleClose } from '@element-plus/icons-vue'

interface Props {
  modelValue: boolean
  title?: string
  width?: string | number
  btns?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '',
  width: '50%',
  btns: () => ['confirm'],
})

const emits = defineEmits<{
  (e: 'update:modelValue', newValue: boolean): void
  (e: 'confirm', val: any): void
  (e: 'check', val: any): void
  (e: 'save', val: any): void
  (e: 'import', val: any): void
  (e: 'close'): void
}>()

const state = reactive({
  confirmShow: false as boolean,
  checkShow: false as boolean,
  saveShow: false as boolean,
  importShow: false as boolean,
})

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

onMounted(() => {
  props.btns.forEach((item) => {
    state[`${item}Show` as keyof typeof state] = true
  })
})

const mConfirm = (val: any) => {
  emits('confirm', val)
}

const mCheck = (val: any) => {
  emits('check', val)
}

const mSave = (val: any) => {
  emits('save', val)
}

const mImport = (val: any) => {
  emits('import', val)
}

const mClose = () => {
  emits('close')
  emits('update:modelValue', false)
}
</script>

<style lang="scss">
.el-dialog {
  max-height: 80%;
  min-height: 40%;
  display: flex;
  flex-direction: column;
  margin-top: 10vh !important;

  .el-dialog__header {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 20px;
    margin-right: 0;

    .el-dialog__title {
      font-size: 1.4rem;
    }

    .el-dialog__headerbtn {
      height: 45px;
      top: 3px;
    }
  }

  .el-dialog__body {
    min-height: 200px;
    font-size: 1.2rem;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .dialog-table-search-bar {
      ul {
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
        margin-bottom: 15px;

        li {
          display: flex;
          align-items: center;
          margin-right: 20px;
          white-space: nowrap;

          label {
            font-size: 14px;
            font-weight: 400;
            text-align: left;
            color: #333333;
          }
        }
      }
    }

    .el-table {
      // height: 400px;
      overflow: auto;
    }

    .pagination-container {
      margin-top: 10px;
    }
  }

  .el-dialog__footer {
    border-top: 1px solid #e5e5e5;
    padding: 10px 20px;
  }
}

.tag-wrapper {
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: auto;

  .tag-content,
  .tag-check-temp {
    padding: 20px;
    border: 1px solid #dedede;
    border-radius: 4px;
    overflow: auto;
  }

  .tag-check-temp {
    width: 200px;
    min-width: 200px;
    margin-left: 20px;

    .text {
      line-height: 1.5;
      font-size: 1.2rem;
    }
  }
}
</style>
