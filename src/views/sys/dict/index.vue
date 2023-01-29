<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>字典名称</label>
        <el-input v-model="state.pageQuery.dictName" type="text" clearable placeholder="请输入字典名称" />
      </div>
      <div class="filter-item">
        <label>字典编号</label>
        <el-input v-model="state.pageQuery.dictCode" type="text" clearable placeholder="请输入字典编号" />
      </div>
      <div class="filter-item">
        <label>字典类型</label>
        <el-select v-model="state.pageQuery.dictType" type="text" clearable placeholder="请选择字典类型">
          <el-option v-for="item in sysDictType" :key="item.value" :label="item.label" :value="Number(item.value)" />
        </el-select>
      </div>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.dict.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.dict.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="dictTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
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
          <el-button v-permission="['sys.dict.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
        </template>
      </el-table-column>
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouterCreate, useRouterShow, useConfirmDel, useMessageSuccess, useMessageWarning, useDict, useValueToLabel } from '@/hooks'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Response } from '@/models/response'
import { Dict } from '@/models/sys/dictModel'

import { getDictPageList, delDict } from '@/apis/sys/dict'

defineOptions({
  name: 'SysDict'
})

const { sysDictType, commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Dict[],
  modelData: {} as Dict,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Dict[],
})
const dictTbRef = ref<ConstTable>()

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

const mCreate = () => {
  useRouterCreate()
}

const mShow = (id: string) => {
  useRouterShow({ path:  id })
}

const mDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item: Dict) => {
    ids.push(item.id)
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