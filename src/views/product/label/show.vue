<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.label.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="标签名称">{{ state.modelData.labelName }}</el-descriptions-item>
      <el-descriptions-item label="标签编号">{{ state.modelData.labelCode }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Label } from '~/models/product/labelModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getLabel } from '~/apis/product/label'

defineOptions({
  name: 'ProductLabelShow',
})

const { commonStatus } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Label,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getLabel(state.id).then((res: Response<Label>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
