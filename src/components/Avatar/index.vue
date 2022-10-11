<template>
  <ImageCropUpload
    v-model="show"
    :field="field"
    :url="url"
    :width="width"
    :height="height"
    :params="params"
    :headers="headers"
    :with-credentials="true"
    img-format="png"
    @src-file-set="srcFileSet"
    @crop-success="cropSuccess"
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import ImageCropUpload from 'vue-image-crop-upload'

interface Props {
  value: any[]
  url: string
  field: string
  width?: number
  height?: number
  params?: object
  headers?: object
}

const props = withDefaults(defineProps<Props>(), {
  value: () => { return [] },
  url: '',
  field: '',
  width: 300,
  height: 300,
  params: () => { return {} },
  headers: () => { return {} }
})

const emits = defineEmits<{(e: 'input', val: any[]): void
  (e: 'src-file-set', fileName: string, fileType: string, fileSize: number): void
  (e: 'crop-success', imgDataUrl: string, field: string): void
  (e: 'crop-upload-success', jsonData: any, field: string): void
  (e: 'crop-upload-fail', status: boolean, field: string): void
}
>()

const show = computed({
  get: () => {
    return props.value
  },
  set: (value) => {
    emits('input', [...value])
  }
})

const srcFileSet = (fileName: string, fileType: string, fileSize: number) => {
  emits('src-file-set', fileName, fileType, fileSize)
}

const cropSuccess = (imgDataUrl: string, field: string) => {
  emits('crop-success', imgDataUrl, field)
}

const cropUploadSuccess = (jsonData: any, field: string) => {
  emits('crop-upload-success', jsonData, field)
}

const cropUploadFail = (status: boolean, field: string) => {
  emits('crop-upload-fail', status, field)
}
</script>
