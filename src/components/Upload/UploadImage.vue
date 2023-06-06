<template>
  <ConstUpload ref="uploadRef" v-model="state.fileList" class="image-uploader" :url="url" :limit="limit" :file-types="['png', 'jpg', 'jpeg']" list-type="picture-card" :on-preview="handleImagePreview" @files-success="uploadAllSuccess">
    <!-- <template> -->
    <!-- <template v-if="limit === 1">
      <el-icon v-if="!modelValue" class="image"><Plus /></el-icon>
    </template>
    <template v-else>
      <el-icon v-if="(modelValue || []).length < limit" class="image"><Plus /></el-icon>
    </template> -->
    <!-- </template> -->.
  </ConstUpload>
  <el-image-viewer v-if="showImageViewer" :url-list="state.previewFiles" :initial-index="previewIndex" hide-on-click-modal @close="showImageViewer = false" />
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

interface Props {
  /** 上传文件列表 */
  modelValue: any[] | string | null
  /** 上传URL */
  url?: string
  /** 最大允许上传个数 */
  limit?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return null
  },
  limit: 1,
})

const emit = defineEmits<{
  (e: 'update:modelValue', fileList: any[]): void
}>()

// 不能直接给reactive对象/数组赋值，否则会失去响应式
const showImageViewer = ref(false)
const previewIndex = ref(0)
const state = reactive({
  fileList: [] as any[],
  previewFiles: [] as string[],
})

const handleImagePreview = (uploadFile: UploadFile) => {
  state.previewFiles = []
  state.fileList.forEach((file, index) => {
    state.previewFiles.push(file.url || '')
    if (file.url == uploadFile.url) {
      previewIndex.value = index
    }
  })

  showImageViewer.value = true
}

watch(
  () => props.modelValue,
  () => {
    console.log(222221, props.modelValue)

    if (props.limit === 1) {
      state.fileList = props.modelValue ? [{ fileName: props.modelValue, url: import.meta.env.VITE_APP_BASE_API + String(props.modelValue) }] : []
    } else {
      state.fileList = new Array(props.modelValue).map((item) => {
        return { ...new Object(item), url: import.meta.env.VITE_APP_BASE_API + new Object(item).fileName }
      })
    }
  }
)

watch(
  () => state.fileList,
  () => {
    if (props.limit === 1) {
      emit('update:modelValue', state.fileList[0] ? state.fileList[0].fileName : '')
    } else {
      emit('update:modelValue', state.fileList)
    }
  }
)

const uploadAllSuccess = () => {
  if (props.limit === 1) {
    emit('update:modelValue', state.fileList[0].fileName)
  } else {
    emit('update:modelValue', state.fileList)
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.image {
  width: 50px;
  height: 50px;

  svg {
    width: 20px;
    height: 20px;
  }
}
</style>
