<template>
  <el-upload
    v-loading="updateLoading"
    auto-upload
    :action="url"
    :headers="headers"
    :file-list="modelValue"
    :multiple="limit > 1"
    :limit="limit"
    :before-upload="beforeUpload"
    :on-change="fileChange"
    :on-progress="fileProgress"
    :on-success="fileSuccess"
    :on-remove="fileRemove"
    :on-exceed="fileExceed"
    v-bind="$attrs"
  >
    <slot>
      <el-button size="small" type="primary">{{ btnText }}</el-button>
    </slot>
  </el-upload>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { UploadFile, UploadFiles, UploadProgressEvent, UploadRawFile } from 'element-plus'
import { useUserStore } from '~/store/user'
import { useMessageError, useMessageWarning } from '~/hooks'
import networkConfig from '~/config/net.config'
import { AllExt, AudioExt, DocExt, ExcelExt, FileType, ImageExt, InstallPackageExt, PDFExt, PPTExt, TxtExt, VideoExt, WordExt, ZipExt } from '~/constant/file'

interface CusUploadFile extends UploadFile {
  fileName: string
  filePath: string
}

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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return []
  },
  fileType: () => {
    return [FileType.All]
  },
  url: `${import.meta.env.VITE_API_URL}file/upload`,
  limit: 8,
  fileMaxSize: 10,
  btnText: '上传文件',
})

const emit = defineEmits<{
  (e: 'update:modelValue', fileList: any[]): void
  (e: 'file-success', fileList: any): void
  (e: 'file-error', fileList: any): void
  (e: 'files-success', fileList: any[]): void
}>()

onMounted(() => {
  init()
})

const headers = reactive(networkConfig.headers as any)
const updateLoading = ref(false)

const init = () => {
  const userStore = useUserStore()
  const token = userStore.token
  token ? (headers['Authorization'] = token) : delete headers['Authorization']
  delete headers['Content-Type']
}

const beforeUpload = (rawFile: UploadRawFile) => {
  if (!validateFileType(rawFile, props.fileType)) {
    // useMessageWarning('上传文件格式不正确!')
    const fileExtArray = getValidateFileTypes(props.fileType)
    useMessageWarning(`请上传${fileExtArray}格式文件`)
    return false
  }

  if (!validateFileSize(rawFile)) {
    return false
  }

  updateLoading.value = true
  return true
}

const fileChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  // console.log(uploadFile)
  // console.log(uploadFiles)
}

const fileProgress = (event: UploadProgressEvent) => {
  event.percent = Number(event.percent.toFixed(2))
}

const fileSuccess = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(111, response)
  console.log(222, uploadFile)
  console.log(333, uploadFiles)

  if (uploadFiles.every((item) => item.status === 'success')) {
    const data = [...props.modelValue]
    uploadFiles.forEach(({ response }: any) => {
      console.log(444, response)
      if (response && response.code === 200) {
        data.push({
          fileName: response.fileName,
          filePath: response.filePath,
          url: response.url,
        })
      }
    })
    updateLoading.value = false
    emit('update:modelValue', data)
    emit('files-success', data)
  }
  if (response.code === 200) {
    emit('file-success', response)
  } else {
    // updateLoading.value = false;
    useMessageError(response.msg)
    emit('file-error', response)
  }
}

const fileRemove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  emit(
    'update:modelValue',
    uploadFiles.map((item) => {
      return { fileName: (item as CusUploadFile).fileName, filePath: (item as CusUploadFile).filePath, name: item.name, url: item.url }
    })
  )
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

const validateFileType = (uploadFile: UploadFile | UploadRawFile, fileTypes: FileType[]) => {
  const fileExtArray = getValidateFileTypes(fileTypes)
  const fileExt = uploadFile.name.toLowerCase().slice(Math.max(0, uploadFile.name.lastIndexOf('.') + 1))

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
  const fileExtArray = [] as string[]

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

<style lang="scss" scoped>
:deep(.el-upload-list__item.is-success.focusing .el-icon--close-tip) {
  display: none !important;
}
</style>
