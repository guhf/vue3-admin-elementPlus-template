<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button :icon="CircleClose" @click="mBack">关闭</el-button>
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
import { reactive, onMounted } from 'vue'
import { CircleClose } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useRouterBackIndex } from '@/hooks'

// import { getNotify, } from "@/apis/user/notify";

const state = reactive({
  id: '',
  modelData: {
    id: ''
  } as any,
  enums: {} as any
})

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
})

const getData = () => {
  // getNotify(state.id)
  //   .then((res: any) => {
  //     if (res?.data != null)
  //       state.modelData = res?.data;

  //     state.enums = res.enums;
  //     if(state.modelData.isRead === false){
  //       store.dispatch(UserActionTypes.ACTION_GET_NOTICE_TOTAL, store.state.user.notifyTotal > 1 ? store.state.user.notifyTotal - 1 : "")
  //     }
  //   })
  //   .catch(() => {});
}

const mBack = () => {
  useRouterBackIndex({ path: '/user/message' })
}
</script>

<style scoped>
</style>
