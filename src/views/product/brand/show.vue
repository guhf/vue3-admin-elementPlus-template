<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.brand.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
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
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex, useDict, useValueToLabel } from '@/hooks'
import { Response } from '@/models/response'
import { Brand } from '@/models/product/brandModel'

import { getBrand } from '@/apis/product/brand'

defineOptions({
  name: 'ProductBrandShow'
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

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>