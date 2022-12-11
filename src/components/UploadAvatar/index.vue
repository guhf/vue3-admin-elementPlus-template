<template>
  <Upload ref="uploadRef" v-model="state.fileList" avatar :btn-text="btnText" :file-type="[1]" :show-file-list="false">
    <img v-if="modelValue" :src="modelValue" class="avatar-image" />
    <el-button v-else size="small" type="primary">{{ btnText }}</el-button>
  </Upload>
</template>

<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue'
import Upload from '@/components/Upload/index.vue'

interface Props {
  /** 上传文件列表 */
  modelValue?: string
  /** 上传按钮文字 */
  btnText?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  btnText: '上传图片'
})

const emits = defineEmits<{
  (e: 'update:modelValue', fileList: any[]): void
}>()

const state = reactive({
  fileList: [] as any[]
})

onMounted(() => {
  state.fileList = [{ url: props.modelValue}]
})

watch(() => state.fileList, () => {
  emits('update:modelValue', state.fileList[0].url)
})

</script>

<style lang="scss" scoped>
.avatar-image{
  max-height: 100px;
}
</style>
