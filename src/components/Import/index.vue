<template>
  <el-button type="primary" :icon="Upload" @click="show">{{ title }}</el-button>
  <const-dialog ref="importDialogRef" :title="dialogTitle" :btns="['import']" @import="handleImport">
    <el-form label-width="160px" :inline="false">
      <el-form-item label="下载模板：">
        <el-button type="text" @click="downloadTemplate">下载模板</el-button>
      </el-form-item>
      <el-form-item label="上传：" prop="file">
        <upload ref="importUploadRef" btn-text="选取文件" :file-list="stateData.uploadList || []" />
      </el-form-item>
    </el-form>
  </const-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { UploadInstance, UploadUserFile } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'
import { useMessageSuccess, useMessageWarning } from '@/hooks/web/message'
import http from '@/utils/http'
import { ResponseCode } from '@/constant/responses'

interface Props {
  title?: string
  dialogTitle?: string
  url: string
  templateUrl: string
  fileSize: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '导入',
  dialogTitle: '导入',
  url: '',
  templateUrl: '',
  fileSize: 5
})

const emits = defineEmits<{
  (e: 'importSuccess'): void
  (e: 'importError'): void
}>()

const stateData = reactive({
  showImportDialog: false,
  uploadList: [] as UploadUserFile[]
})

const importDialogRef = ref<ConstDialog>()
const importUploadRef = ref<UploadInstance>()

const show = () => {
  stateData.uploadList = []
  stateData.showImportDialog = true
}
const downloadTemplate = () => {
  window.location.href = process.env.VUE_APP_BASE_API + props.templateUrl
}

const handleImport = () => {
  const files = importUploadRef.value?.fileList || []
  if (files.length > 0) {
    http.post<any>(props.url, files).then((res) => {
      if (res.code === ResponseCode.OK) {
        emits('importSuccess')
        useMessageSuccess(res.msg)
      } else {
        emits('importError')
      }
    })
  } else {
    useMessageWarning('请选择文件')
  }
}
</script>

<style lang="scss">
</style>
