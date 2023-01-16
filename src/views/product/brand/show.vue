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
        <el-image v-if="state.modelData.brandLogo" style="height: 50px" :src="state.modelData.brandLogo" :preview-src-list="[state.modelData.brandLogo || '']" fit="cover" />
      </el-descriptions-item>
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
import { Brand } from '@/models/product/brandModel'

import { getBrand } from '@/apis/product/brand'

defineOptions({
  name: 'ProductBrandShow'
})

const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Brand,
})

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
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