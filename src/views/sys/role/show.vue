<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['sys.role.update']" type="primary" :icon="Edit" :disabled="state.modelData.roleType === 1" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-card header="基本信息">
      <el-descriptions title="" :column="2" border>
        <el-descriptions-item label="角色名称">{{ state.modelData.roleName }}</el-descriptions-item>
        <el-descriptions-item label="角色标识">{{ state.modelData.roleCode }}</el-descriptions-item>
        <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Role } from '~/models/sys/roleModel'
import { useRouterBackIndex, useRouterUpdate } from '~/hooks'

import { getRole } from '~/apis/sys/role'

defineOptions({
  name: 'SysRoleShow',
})

const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Role,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getRole(state.id).then((res: Response<Role>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
