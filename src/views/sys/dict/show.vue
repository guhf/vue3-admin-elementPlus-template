<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.dict.update']" type="primary" :icon="Edit" @click="mEdit">编辑</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-descriptions title="" :column="2" border>
      <el-descriptions-item label="字典名称">{{ state.modelData.dictName }}</el-descriptions-item>
      <el-descriptions-item label="字典编号">{{ state.modelData.dictCode }}</el-descriptions-item>
      <el-descriptions-item label="字典类型">{{ useValueToLabel(sysDictType, state.modelData.dictType) }}</el-descriptions-item>
      <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ state.modelData.remark }}</el-descriptions-item>
    </el-descriptions>
    <ConstTable ref="dictTbRef" :data="state.modelData.dictItems">
      <el-table-column label="字典明细名称" prop="dictItemName" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="字典明细键值" prop="dictItemValue" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="备注" prop="remark" min-width="360" header-align="center" align="left" show-overflow-tooltip />
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Edit, CircleClose } from '@element-plus/icons-vue'
import { useRouterUpdate, useRouterBackIndex, useDict, useValueToLabel } from '@/hooks'
import { Response } from '@/models/response'
import { Dict } from '@/models/sys/dictModel'

import { getDict } from '@/apis/sys/dict'

defineOptions({
  name: 'SysDictShow'
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
  const id = params.id as string
  if (params.id) state.id = id

  getData()
})

const getData = () => {
  getDict(state.id).then((res: Response<Dict>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const mEdit = () => {
  useRouterUpdate({ path: state.id })
}
</script>