<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['sys.user.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="用户名称">{{ state.modelData.userName }}</el-descriptions-item>
      <el-descriptions-item label="用户编号">{{ state.modelData.userCode }}</el-descriptions-item>
      <el-descriptions-item label="账号名称">{{ state.modelData.accountName }}</el-descriptions-item>
      <el-descriptions-item label="用户角色">
        <el-space v-if="state.modelData.userRoles" wrap>
          <el-tag v-for="(role, index) in state.modelData.userRoles" :key="index" size="small" effect="light">{{ role.roleName }}</el-tag>
        </el-space>
      </el-descriptions-item>
      <el-descriptions-item label="出生日期">{{ state.modelData.birthday }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        <el-tag :type="state.modelData.sex === 1 ? '' : state.modelData.sex === 0 ? 'danger' : 'info'" size="small" effect="light">
          {{ useValueToLabel(commonSex, state.modelData.sex) }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号码" :span="2">{{ state.modelData.phone }}</el-descriptions-item>
      <!-- <el-descriptions-item label="省市区" :span="2">{{ state.modelData.Province + state.modelData.City + state.modelData.County + "" }}</el-descriptions-item> -->
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { User } from '~/models/sys/userModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getUser } from '~/apis/sys/user'

defineOptions({
  name: 'SysUserShow',
})

const { commonSex } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as User,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getUser(state.id).then((res: Response<User>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
