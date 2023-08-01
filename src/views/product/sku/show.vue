<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['sys.dict.update']" type="primary" :icon="Edit" @click="handleEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="字典名称">{{ state.modelData.dictName }}</el-descriptions-item>
      <el-descriptions-item label="字典编号">{{ state.modelData.dictCode }}</el-descriptions-item>
      <el-descriptions-item label="字典类型">{{ useValueToLabel(sysDictType, state.modelData.dictType) }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ state.modelData.remark }}</el-descriptions-item>
    </el-descriptions>
    <CommonTable ref="dictTbRef" :data="state.modelData.dictItems">
      <el-table-column label="字典明细名称" prop="dictItemName" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="字典明细键值" prop="dictItemValue" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" min-width="360" header-align="center" align="left" show-overflow-tooltip />
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { CircleClose, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Dict } from '~/models/sys/dictModel'
import { useDict, useRouterBackIndex, useRouterUpdate, useValueToLabel } from '~/hooks'

import { getDict } from '~/apis/sys/dict'

defineOptions({
  name: 'SysDictShow',
})

const { sysDictType } = useDict()
const state = reactive({
  id: '',
  modelData: {
    id: '',
  } as Dict,
})

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getDict(state.id).then((res: Response<Dict>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>
