<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.brand.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="品牌名称">{{ state.modelData.brandName }}</el-descriptions-item>
      <el-descriptions-item label="品牌编号">{{ state.modelData.brandCode }}</el-descriptions-item>
      <el-descriptions-item label="品牌Logo">
        <el-image v-if="state.modelData.brandImg" style="height: 50px" :src="state.modelData.brandImg" :preview-src-list="[state.modelData.brandImg || '']" fit="cover" />
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="排序号" :span="2">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Brand } from '~/models/product/brandModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getBrand } from '~/apis/product/brand'

defineOptions({
  name: 'ProductBrandShow',
})

const { commonStatus } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Brand,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getBrand(state.id).then((res: Response<Brand>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
