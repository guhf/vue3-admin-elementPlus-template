<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.attribute.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="规格名称">{{ state.modelData.attributeName }}</el-descriptions-item>
      <el-descriptions-item label="规格编号">{{ state.modelData.attributeCode }}</el-descriptions-item>
      <el-descriptions-item label="状态" :span="2">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
    <CommonTable ref="attributeItemTbRef" :data="state.modelData.attributeItems" :check="false">
      <el-table-column label="规格属名称" prop="name" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="规格属值" prop="value" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Attribute } from '~/models/product/attributeModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getAttribute } from '~/apis/product/attribute'

defineOptions({
  name: 'ProductAttributeShow',
})

const { commonStatus } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Attribute,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getAttribute(state.id).then((res: Response<Attribute>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
