<template>
   <!-- :file-type="[1]" -->
  <Upload ref="uploadRef" v-model="state.fileList" :btn-text="btnText" :show-file-list="false">
    <template #trigger>
      <!-- <img v-if="modelValue" :src="modelValue" class="avatar" /> -->
      <el-button size="small" type="primary">{{ btnText }}</el-button>
    </template>
  </Upload>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
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

const state = reactive({
  fileList: [] as any[]
})

console.log(props.modelValue);


watch(() => props.modelValue, () => {
  state.fileList = [{ url: props.modelValue}]
})

</script>

<style scoped>
</style>
