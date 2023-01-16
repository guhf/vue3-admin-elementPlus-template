<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.service.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="服务名称">{{ state.modelData.serviceName }}</el-descriptions-item>
      <el-descriptions-item label="服务编号">{{ state.modelData.serviceCode }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="描述">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex } from '@/hooks/web/router'
import { Response } from '@/models/response'
import { Service } from '@/models/product/serviceModel'

import { getService } from '@/apis/product/service'

defineOptions({
  name: 'ProductServiceShow'
})

const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Service,
})

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
})

const getData = () => {
  getService(state.id).then((res: Response<Service>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>