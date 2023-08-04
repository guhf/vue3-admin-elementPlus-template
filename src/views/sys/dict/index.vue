<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="字典名称">
        <el-input v-model="state.pageQuery.dictName" type="text" clearable placeholder="请输入字典名称" />
      </FilterItem>
      <FilterItem label="字典编号">
        <el-input v-model="state.pageQuery.dictCode" type="text" clearable placeholder="请输入字典编号" />
      </FilterItem>
      <FilterItem label="字典类型">
        <el-select v-model="state.pageQuery.dictType" type="text" clearable placeholder="请选择字典类型">
          <el-option v-for="item in sysDictType" :key="item.value" :label="item.label" :value="Number(item.value)" />
        </el-select>
      </FilterItem>
      <FilterItem label="字典类型">
        <el-select v-model="state.pageQuery.dictType" type="text" clearable placeholder="请选择字典类型">
          <el-option v-for="item in sysDictType" :key="item.value" :label="item.label" :value="Number(item.value)" />
        </el-select>
      </FilterItem>
    </Filter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.dict.create']" class="btn-item" type="primary" :icon="Edit" @click="handleCreate">添加</el-button>
        <el-button v-permission="['sys.dict.del']" class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
      </div>
    </div>
    <CommonTable ref="dictTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="字典名称" prop="dictName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="字典编号" prop="dictCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="字典类型" prop="dictType" sortable="custom" min-width="200" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag size="small" effect="light">
            {{ useValueToLabel(sysDictType, row.dictType) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['sys.dict.show']" type="primary" size="small" @click="handleShow(row.id)">查看</el-button>
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import type { PageQuery } from '~/models/common/pageQueryModel'
import type { Response } from '~/models/response'
import type { Dict } from '~/models/sys/dictModel'
import { useConfirmDel, useDict, useMessageSuccess, useMessageWarning, useRouterCreate, useRouterShow, useValueToLabel } from '~/hooks'

import { delDict, getDictPageList } from '~/apis/sys/dict'

defineOptions({
  name: 'SysDict',
})

const { sysDictType, commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Dict[],
  modelData: {} as Dict,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Dict[],
})
const dictTbRef = ref<CommonTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getDictPageList(state.pageQuery).then((res: Response<Dict[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  dictTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  dictTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Dict[]) => {
  state.selectTableData = val ?? []
}

const handleCreate = () => {
  useRouterCreate()
}

const handleShow = (id: string) => {
  useRouterShow({ path: id })
}

const handleDel = () => {
  const ids = state.selectTableData.map((item) => {
    return item.id
  })

  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delDict(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}
</script>
