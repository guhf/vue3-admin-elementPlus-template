<template>
  <el-upload
    :action="url" :headers="stateData.headers" :file-list="stateData.uploadFiles" :list-type="stateData.listType" :auto-upload="true" :multiple="stateData.multiple" :limit="limit"
    :before-upload="beforeUpload" :on-change="fileChange" :on-progress="fileProgress" :on-success="fileSuccess" :on-preview="filePreview" :on-remove="fileRemove" :on-exceed="fileExceed"
  >
    <i v-if="stateData.listType === 2 || stateData.listType === 5" class="el-icon-plus" />
    <el-button v-else size="small" type="primary">{{ btnText }}</el-button>
  </el-upload>

  <el-image-viewer
    v-if="stateData.showImageViewer" :url-list="stateData.previewFiles"
    :initial-index="stateData.previewIndex" :hide-on-click-modal="true" @close="stateData.showImageViewer = false"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useMessageWarning } from '@/hooks/web/message'
import networkConfig from '@/config/net.config'
import { ResponseCode } from '@/constant/responses'
import { AllExt, ImageExt, WordExt, ExcelExt, PPTExt, AudioExt, VideoExt, DocExt, ZipExt, InstallPackageExt } from '@/constant/fileexts'
import { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from 'element-plus'

/**
 * 文件类型
 */
enum FileType {
  All,
  /**
   * 图片
   */
  Image
}

interface Props {
  /** 上传文件类型; 0:全部,1:图片,2:word文件,3:excel文件,4:ppt文件,5:音频,6:视频,7:文本,8:压缩文件,9:安装包 */
  fileType?: number
  /** 上传URL */
  url?: string
  /** 最大允许上传个数 */
  limit?: number
  /** 单文件最大限制,单位:MB */
  fileMaxSize?: number
  /** 上传文件列表 */
  fileList?: any[]
  /** 上传按钮文字 */
  btnText?: string
}

const props = withDefaults(defineProps<Props>(), {
  fileType: 0,
  url: import.meta.env.VITE_API_URL + 'file/upload',
  limit: 8,
  fileMaxSize: 10,
  fileList: () => { return [] },
  btnText: '上传'
})

onMounted(() => {
  init()
  setFileList()
})

const stateData = reactive({
  headers: networkConfig.headers as any,
  listType: 'text' as any,
  multiple: true as boolean,
  showImageViewer: false as boolean,
  previewFiles: [] as Array<string>,
  previewIndex: 0 as number,
  uploadFiles: computed(() => {
    return props.fileList
  })
})

const init = () => {
  stateData.multiple = props.limit > 1

  const userStore = useUserStore()
  const token = userStore.token
  token ? stateData.headers['Authorization'] = 'Bearer ' + token : delete stateData.headers['Authorization']
  delete stateData.headers['Content-Type']

  stateData.uploadFiles.forEach((uploadFile: any) => {
    uploadFile.name = uploadFile.fileName
  })
}

const beforeUpload = (rawFile: UploadRawFile) => {
  if (!validateFileType(rawFile, props.fileType) && !validateFileSize(rawFile)) {
    return false
  }

  return true
}

const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(uploadFile)
  console.log(uploadFiles)
}

const fileProgress = (event: UploadProgressEvent) => {
  event.percent = Number(event.percent.toFixed(2))
}

const fileSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  stateData.uploadFiles = extrectUploadFile(uploadFiles)

  if (response.code === ResponseCode.OK) {
    response.stateData[0].name = response.stateData[0].fileName
    if (validateFileType(response.stateData[0], 2)) {
      stateData.previewFiles.push(response.stateData[0].url)
    }
  }
}

const filePreview = (uploadFile: UploadFile) => {
  if (!validateFileType(uploadFile, FileType.Image)) return
  // if (!validateFileType(uploadFile, 6)) return

  stateData.previewIndex = checkExists(uploadFile.name)
  stateData.showImageViewer = true
}

const fileRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  stateData.uploadFiles = extrectUploadFile(uploadFiles)
}

const fileExceed = () => {
  let msg = '个文件'
  switch (props.fileType) {
    case 1:
      msg = '张图片'
      break
    case 2:
      msg = '个word文档'
      break
    case 3:
      msg = '个excel文档'
      break
    case 4:
      msg = '个ppt文档'
      break
    case 5:
      msg = '个音频'
      break
    case 6:
      msg = '个视频'
      break
    case 7:
      msg = '个文档'
      break
    case 8:
      msg = '个压缩包'
      break
    case 9:
      msg = '个安装包'
      break
  }

  messageWarning(`最多上传${props.limit + msg}！`)
}

const checkExists = (fileName: string) => {
  for (let index = 0, len = stateData.previewFiles.length; index < len; index++) {
    if (stateData.previewFiles[index].indexOf(fileName) > -1) {
      return index
    }else{
      return 0
    }
  }
}

const setFileList = () => {
  switch (props.fileType) {
    case 1:
    case 6:
      stateData.listType = 'picture-card'
      break
    case 2:
    case 5:
      stateData.listType = 'text'
      break
    case 4:
      break
  }
}

const validateFileType = (uploadFile: UploadFile | UploadRawFile, fileType: number) => {
  let fileExtArray = AllExt
  const fileExt = uploadFile.name.toLowerCase().substring(uploadFile.name.lastIndexOf('.') + 1)

  switch (fileType) {
    case 1:
      fileExtArray = ImageExt
      break
    case 2:
      fileExtArray = WordExt
      break
    case 3:
      fileExtArray = ExcelExt
      break
    case 4:
      fileExtArray = PPTExt
      break
    case 5:
      fileExtArray = AudioExt
      break
    case 6:
      fileExtArray = VideoExt
      break
    case 7:
      fileExtArray = DocExt
      break
    case 8:
      fileExtArray = ZipExt
      break
    case 9:
      fileExtArray = InstallPackageExt
      break
    default:
      fileExtArray = AllExt
      break
  }

  if (!fileExtArray.includes(fileExt)) {
    useMessageWarning('上传文件格式不正确!')
    return false
  }
  return true
}

const validateFileSize = (rawFile: UploadRawFile) => {
  const sizeLimt = (rawFile.size || 0) / 1024 / 1024 < props.fileMaxSize
  if (!sizeLimt) {
    useMessageWarning(`文件大小不能超过${props.fileMaxSize}MB!`)
    return false
  }
  return true
}

const extrectUploadFile = (uploadFiles: UploadFiles) => {
  const files = [] as UploadFiles
  uploadFiles.forEach((uploadFile: any) => {
    if (uploadFile.response) {
      uploadFile.response.data[0].name = uploadFile.response.data[0].fileName
      files.push(uploadFile.response.data[0])
    } else {
      files.push(uploadFile)
    }
  })
  return files
}

defineExpose({
  files: stateData.uploadFiles
})
</script>

<style scoped>
</style>
