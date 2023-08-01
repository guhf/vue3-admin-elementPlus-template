<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.service.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="服务名称">{{ state.modelData.serviceName }}</el-descriptions-item>
      <el-descriptions-item label="服务编号">{{ state.modelData.serviceCode }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Service } from '~/models/product/serviceModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getService } from '~/apis/product/service'

defineOptions({
  name: 'ProductServiceShow',
})

const { commonStatus } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Service,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getService(state.id).then((res: Response<Service>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
