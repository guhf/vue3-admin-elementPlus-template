<template>
  <el-upload
    :action="url" :headers="stateData.headers" :file-list="modelValue" :list-type="stateData.listType" :auto-upload="true" :multiple="stateData.multiple" :limit="limit"
    :show-file-list="showFileList"
    :before-upload="beforeUpload" :on-change="fileChange" :on-progress="fileProgress" :on-success="fileSuccess" :on-preview="filePreview" :on-remove="fileRemove" :on-exceed="fileExceed"
  >
    <el-icon v-if="stateData.listType === 'picture-card'"><Plus /></el-icon>
    <el-button v-else size="small" type="primary">{{ btnText }}</el-button>
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-image-viewer
    v-if="stateData.showImageViewer" :url-list="stateData.previewFiles"
    :initial-index="stateData.previewIndex" :hide-on-click-modal="true" @close="stateData.showImageViewer = false"
  />
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue'
import { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'
import { useMessageWarning } from '@/hooks/web/message'
import networkConfig from '@/config/net.config'
import { FileType, AllExt, ImageExt, WordExt, ExcelExt, PPTExt, AudioExt, VideoExt, DocExt, ZipExt, InstallPackageExt, PDFExt, TxtExt } from '@/constant/file'

interface Props {
  /** 上传文件列表 */
  modelValue: any[]
  /** 上传文件类型; 0:全部,1:图片,2:word文件,3:excel文件,4:ppt文件,5:pdf文件,6:word/excel/ppt/pdf,7:音频,8:视频,9:文本,10:压缩文件,11:安装包 */
  fileType?: FileType[]
  /** 上传URL */
  url?: string
  /** 最大允许上传个数 */
  limit?: number
  /** 单文件最大限制,单位:MB */
  fileMaxSize?: number
  /** 上传按钮文字 */
  btnText?: string
  /** 显示上传文件列表 */
  showFileList: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => { return [] },
  fileType: () => { return [FileType.All] },
  url: import.meta.env.VITE_API_URL + 'file/upload',
  limit: 8,
  fileMaxSize: 10,
  btnText: '上传文件',
  showFileList: true
})

const emits = defineEmits<{
  (e: 'update:modelValue', fileList: any[]): void
}>()

onMounted(() => {
  init()
  setFileList()
})

watch(() => props.modelValue, () => {
  stateData.uploadFiles = props.modelValue
})

const stateData = reactive({
  headers: networkConfig.headers as any,
  listType: 'text' as any,
  multiple: true as boolean,
  showImageViewer: false as boolean,
  previewFiles: [] as string[],
  previewIndex: 0 as number,
  uploadFiles: [] as any[]
})

const init = () => {
  stateData.multiple = props.limit > 1

  const userStore = useUserStore()
  const token = userStore.token
  token ? stateData.headers['Authorization'] = token : delete stateData.headers['Authorization']
  delete stateData.headers['Content-Type']
}

const beforeUpload = (rawFile: UploadRawFile) => {
  if (!validateFileType(rawFile, props.fileType)) {
    // useMessageWarning('上传文件格式不正确!')
    let fileExtArray = getValidateFileTypes(props.fileType)
    useMessageWarning(`请上传${fileExtArray}格式文件`)
    return false
  }

  if (!validateFileSize(rawFile)) {
    return false
  }

  return true
}

const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log(uploadFile)
  // console.log(uploadFiles)
}

const fileProgress = (event: UploadProgressEvent) => {
  event.percent = Number(event.percent.toFixed(2))
}

const fileSuccess = (response: any) => {
  stateData.uploadFiles.push(response.data[0])
  stateData.uploadFiles.sort()

  if (validateFileType(response.data[0], [FileType.Image])) {
    stateData.previewFiles.push(response.data[0].url)
  }
  emits('update:modelValue', stateData.uploadFiles)
}

const filePreview = (uploadFile: UploadFile) => {
  if (!validateFileType(uploadFile, [FileType.Image])) return

  stateData.previewFiles = []
  stateData.uploadFiles.forEach((file, index) => {
    stateData.previewFiles.push(file.url)
    // 可以使用file.name == uploadFile.name判断，但是文件名称有可能重复
    if (file.url == uploadFile.response?.data[0].url) {
      stateData.previewIndex = index
    }
  });
  
  stateData.showImageViewer = true
}

const fileRemove = (uploadFile: UploadFile) => {
  stateData.uploadFiles.splice(getIndex(stateData.uploadFiles, uploadFile.response?.data[0]), 1)
  emits('update:modelValue', stateData.uploadFiles)
}

const getIndex = (files: any[], file: any) => {
  for (let index = 0, len = files.length; index < len; index++) {
    if (files[index].url === file.url) {
      return index
    }
  }
  return -1;
}

const fileExceed = () => {
  let msg = '个文件'
  
  if (props.fileType.length === 1) {
    switch (props.fileType[0]) {
      case FileType.Image:
        msg = '张图片'
        break
      case FileType.Word:
        msg = '个word文件'
        break
      case FileType.Excel:
        msg = '个excel文件'
        break
      case FileType.PPT:
        msg = '个ppt文件'
        break
      case FileType.PDF:
        msg = '个pdf文件'
        break
      case FileType.Doc:
        msg = '个文件'
        break
      case FileType.Audio:
        msg = '个音频文件'
        break
      case FileType.Video:
        msg = '个视频文件'
        break
      case FileType.Txt:
        msg = '个文件'
        break
      case FileType.Zip:
        msg = '个压缩包'
        break
      case FileType.InstallPackage:
        msg = '个安装包'
        break
    }
  }

  useMessageWarning(`最多上传${props.limit + msg}！`)
}

const setFileList = () => {
  if (props.fileType.length === 1) {
    switch (props.fileType[0]) {
      case FileType.Image:
      case FileType.Video:
        stateData.listType = 'picture-card'
        break
      default:
        stateData.listType = 'text'
        break
    }
  } else {
    stateData.listType = 'text'
  }
  console.log(stateData.listType);
  
}

const validateFileType = (uploadFile: UploadFile | UploadRawFile, fileTypes: FileType[]) => {
  let fileExtArray = getValidateFileTypes(fileTypes)
  const fileExt = uploadFile.name.toLowerCase().substring(uploadFile.name.lastIndexOf('.') + 1)

  if (!fileExtArray.includes(fileExt)) {
    return false
  }
  return true
}

/**
 * 获取上传文件类型
 * @param fileTypes 上传文件类型
 */
const getValidateFileTypes = (fileTypes: FileType[]) => {
  let fileExtArray = [] as string[]

  fileTypes.forEach((fileType) => {
    switch (fileType) {
      case FileType.Image:
        fileExtArray.push(...ImageExt)
        break
      case FileType.Word:
        fileExtArray.push(...WordExt)
        break
      case FileType.Excel:
        fileExtArray.push(...ExcelExt)
        break
      case FileType.PPT:
        fileExtArray.push(...PPTExt)
        break
      case FileType.PDF:
        fileExtArray.push(...PDFExt)
        break
      case FileType.Doc:
        fileExtArray.push(...DocExt)
        break
      case FileType.Audio:
        fileExtArray.push(...AudioExt)
        break
      case FileType.Video:
        fileExtArray.push(...VideoExt)
        break
      case FileType.Txt:
        fileExtArray.push(...TxtExt)
        break
      case FileType.Zip:
        fileExtArray.push(...ZipExt)
        break
      case FileType.InstallPackage:
        fileExtArray.push(...InstallPackageExt)
        break
      default:
        fileExtArray.push(...AllExt)
        break
    }
  })
  return fileExtArray
}

const validateFileSize = (rawFile: UploadRawFile) => {
  const sizeLimt = (rawFile.size || 0) / 1024 / 1024 < props.fileMaxSize
  if (!sizeLimt) {
    useMessageWarning(`文件大小不能超过${props.fileMaxSize}MB!`)
    return false
  }
  return true
}

</script>

<style scoped>

::v-deep(.el-upload-list__item.is-success.focusing .el-icon--close-tip){
  display: none !important;
}
</style>
