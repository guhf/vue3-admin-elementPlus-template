<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.attribute.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="规格名称">{{ state.modelData.attributeName }}</el-descriptions-item>
      <el-descriptions-item label="规格编号">{{ state.modelData.attributeCode }}</el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag size="small" effect="light">{{ useValueToLabel(commonStatus, state.modelData.status) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="描述" :span="2">{{ state.modelData.description }}</el-descriptions-item>
    </el-descriptions>
    <ConstTable ref="attributeTbRef" :data="state.modelData.attributeItems">
      <el-table-column label="规格属性值" prop="value" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex, useDict, useValueToLabel } from '@/hooks'
import { Response } from '@/models/response'
import { Attribute } from '@/models/product/attributeModel'

import { getAttribute } from '@/apis/product/attribute'

defineOptions({
  name: 'ProductAttributeShow'
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

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>