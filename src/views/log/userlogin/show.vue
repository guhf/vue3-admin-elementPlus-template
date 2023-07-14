<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <!-- <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="角色名称">{{ state.modelData.roleName }}</el-descriptions-item>
      <el-descriptions-item label="角色标识">{{ state.modelData.roleCode }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
      <el-descriptions-item label="创建人">{{ state.modelData.createUserName }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ state.modelData.createDateTime }}</el-descriptions-item>
    </el-descriptions> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose } from '@element-plus/icons-vue'
import type { userLogin } from '~/models/log/userLoginModel'
import { useRouterBackIndex } from '~/hooks'

import { getRole } from '~/apis/sys/role'

const state = reactive({
  id: '',
  modelData: {} as userLogin,
})

onMounted(() => {
  const { query } = useRoute()
  const id = query.id as string

  if (query.id) state.id = id

  getData()
})

const getData = () => {
  getRole(state.id).then((res: any) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}
</script>
