<template>
  <div class="app-main-wrapper">
    <el-form ref="modelRef" label-width="120px">
      <el-col :span="12">
        <el-form-item label="上传资源:" prop="brandName">
          <Upload ref="importUploadRef" v-model="state.modelData.file" :file-max-size="1024" />
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import Upload from '~/components/upload/index.vue'

const state = reactive({
  modelData: {} as any,
})

onMounted(() => {})
</script>
