<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.brand.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="品牌名称">{{ state.modelData.brandName }}</el-descriptions-item>
      <el-descriptions-item label="品牌编号">{{ state.modelData.brandCode }}</el-descriptions-item>
      <el-descriptions-item label="品牌类型">{{ useValueToLabel(productBrandType, state.modelData.brandType) }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ state.modelData.remark }}</el-descriptions-item>
    </el-descriptions>
    <ConstTable ref="brandTbRef" :data="state.modelData.brandItems">
      <el-table-column label="品牌明细名称" prop="brandItemName" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="品牌明细键值" prop="brandItemValue" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" min-width="360" header-align="center" align="left" show-overflow-tooltip />
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex } from '@/hooks/web/router'
import { useBrand, useValueToLabel } from '@/hooks/event/brand'
import { Response } from '@/models/response'
import { Brand } from '@/models/product/brandModel'

import { getBrand } from '@/apis/product/brand'

defineOptions({
  name: 'ProductBrandShow'
})

const { productBrandType } = useBrand()
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
    if (res.data != null) {
      state.modelData = res.data
    }
  })
}

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>