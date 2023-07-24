<template>
  <el-button type="primary" :icon="UploadIcon" @click="show">{{ title }}</el-button>
  <ConstDialog ref="importDialogRef" :title="dialogTitle" :btns="['import']" @import="handleImport">
    <el-form label-width="160px" :inline="false">
      <el-form-item label="下载模板：">
        <el-button type="text" @click="downloadTemplate">下载模板</el-button>
      </el-form-item>
      <el-form-item label="上传：" prop="file">
        <Upload ref="importUploadRef" btn-text="选取文件" :file-list="stateData.uploadList || []" />
        <!-- <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" style="color: red" slot="tip">
          {{ 
            `提示：仅允许导入${ fileTypes.length > 0 ? `'${fileTypes.join("、")}'格式且` : "" }大小不允许超过${fileMaxSize}M文件！` 
          }}
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="downloadTemplate">下载模板</el-link> -->
      </el-form-item>
    </el-form>
  </ConstDialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { Upload as UploadIcon } from '@element-plus/icons-vue'
import type { UploadInstance, UploadUserFile } from 'element-plus'
import { useMessageSuccess, useMessageWarning, useRequest } from '~/hooks'
import { ResponseCode } from '~/constant/responses'

import Upload from '~/components/upload/index.vue'

interface Props {
  title?: string
  dialogTitle?: string
  url: string
  templateUrl: string
  fileSize: number
}

const { post } = useRequest()
const props = withDefaults(defineProps<Props>(), {
  title: '导入',
  dialogTitle: '导入',
  url: '',
  templateUrl: '',
  fileSize: 5,
})

const emits = defineEmits<{
  (e: 'importSuccess'): void
  (e: 'importError'): void
}>()

const stateData = reactive({
  showImportDialog: false,
  uploadList: [] as UploadUserFile[],
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
    post<any>(props.url, files).then((res) => {
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

<style lang="scss"></style>
