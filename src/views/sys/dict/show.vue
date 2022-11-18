<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.user.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="字典编号">{{ state.modelData.dictCode }}</el-descriptions-item>
      <el-descriptions-item label="字典名称">{{ state.modelData.dictName }}</el-descriptions-item>
      <el-descriptions-item label="字典类型">{{ state.modelData.dictType }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ state.modelData.remark }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex } from '@/hooks/web/router'
import { Response } from '@/models/response'
import { User } from '@/models/sys/userModel'

import { getUser } from '@/apis/sys/user'

defineOptions({
  name: 'SysDictShow'
})

const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as User,
})

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
})

const getData = () => {
  getUser(state.id).then((res: Response<User>) => {
    if (res.data != null) {
      state.modelData = res.data
    }
  })
}

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>