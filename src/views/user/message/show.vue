<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <div class="context-container">
      <el-card header="基本信息">
        <el-descriptions title="" :column="2" border>
          <el-descriptions-item label="通知名称" :span="2">{{ state.modelData.title }}</el-descriptions-item>
          <el-descriptions-item label="通知内容" :span="2">{{ state.modelData.content }}</el-descriptions-item>
          <el-descriptions-item label="发送人">{{ state.modelData.senderName }}</el-descriptions-item>
          <el-descriptions-item label="接收人">{{ state.modelData.receiverName }}</el-descriptions-item>
          <el-descriptions-item label="发送时间">{{ state.modelData.sendTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose } from '@element-plus/icons-vue'
import { useRouterBackIndex } from '~/hooks'

import { getMessage } from '~/apis/user/message'

const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as any,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getMessage(state.id).then((res: any) => {
    state.modelData = res?.data
  })
}
</script>

<style scoped></style>
