<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.attrtemplate.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="规格模板名称">{{ state.modelData.attrTemplateName }}</el-descriptions-item>
      <el-descriptions-item label="规格模板编号">{{ state.modelData.attrTemplateCode }}</el-descriptions-item>
      <el-descriptions-item label="状态" :span="2">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
    <CommonTable ref="attrTemplateTbRef" :data="state.modelData.attrTemplateItems">
      <el-table-column label="规格名称" prop="attributeName" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="规格编号" prop="attributeCode" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { AttrTemplate } from '~/models/product/attrTemplateModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getAttrTemplate } from '~/apis/product/attrTemplate'

defineOptions({
  name: 'ProductAttrTemplateShow',
})

const { commonStatus } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as AttrTemplate,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getAttrTemplate(state.id).then((res: Response<AttrTemplate>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
