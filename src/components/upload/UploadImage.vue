<template>
  <ConstUpload ref="uploadRef" v-model="fileList" class="image-uploader" :url="url" :limit="limit" :file-type="[1]" list-type="picture-card" :on-preview="handleImagePreview">
    <!-- <template> -->
    <!-- <template v-if="limit === 1">
      <el-icon v-if="!modelValue" class="image"><Plus /></el-icon>
    </template>
    <template v-else>
      <el-icon v-if="(modelValue || []).length < limit" class="image"><Plus /></el-icon>
    </template> -->
    <!-- </template> -->
    <el-icon class="image"><Plus /></el-icon>
  </ConstUpload>
  <el-image-viewer v-if="showImageViewer" :url-list="state.previewFiles" :initial-index="previewIndex" hide-on-click-modal @close="showImageViewer = false" />
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

interface Props {
  /** 上传文件列表 */
  modelValue: any[] | string | null | undefined
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
  (e: 'update:modelValue', files: any[] | string | null | undefined): void
}>()

// 不能直接给reactive对象/数组赋值，否则会失去响应式
const showImageViewer = ref(false)
const previewIndex = ref(0)
const state = reactive({
  previewFiles: [] as string[],
})

const fileList = computed({
  get() {
    let list = []
    if (props.limit === 1) {
      list = props.modelValue
        ? [
            {
              path: props.modelValue,
              url: import.meta.env.VITE_BASE_API + String(props.modelValue).replaceAll(String(import.meta.env.VITE_BASE_API), ''),
            },
          ]
        : []
    } else {
      list = new Array(props.modelValue).map((item: any) => {
        return {
          ...item,
          url: item.url || import.meta.env.VITE_BASE_API + item.path.replaceAll(String(import.meta.env.VITE_BASE_API), ''),
        }
      })
    }
    return list
  },
  set(value) {
    let val = [] as any[] | string
    if (props.limit === 1) {
      if (value.length === 0) {
        val = ''
      } else {
        val = value[0].path
      }
    } else {
      val = value
    }

    emit('update:modelValue', val)
  },
})

const handleImagePreview = (uploadFile: UploadFile) => {
  state.previewFiles = []
  fileList.value.forEach((file, index) => {
    state.previewFiles.push(file.url || '')
    if (file.url == uploadFile.url) {
      previewIndex.value = index
    }
  })

  showImageViewer.value = true
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
