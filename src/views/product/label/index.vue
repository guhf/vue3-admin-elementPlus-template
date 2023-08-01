<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="标签名称">
        <el-input v-model="state.pageQuery.labelName" type="text" clearable placeholder="请输入标签名称" />
      </FilterItem>
      <FilterItem label="标签编号">
        <el-input v-model="state.pageQuery.labelCode" type="text" clearable placeholder="请输入标签编号" />
      </FilterItem>
    </Filter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.label.create']" class="btn-item" type="primary" :icon="Edit" @click="handleCreate">添加</el-button>
        <el-button v-permission="['product.label.del']" class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
      </div>
    </div>
    <CommonTable ref="labelTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="标签名称" prop="labelName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="标签编号" prop="labelCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-model="row.status" v-permission="['product.label.enable']" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" @change="handleEnableDisable(row)" />
          <el-tag v-permission:un="['product.label.enable']" :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.label.show']" type="primary" size="small" @click="handleShow(row.id)">查看</el-button>
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
import type { Label } from '~/models/product/labelModel'
import { useConfirm, useConfirmDel, useDict, useMessageSuccess, useMessageWarning, useRouterCreate, useRouterShow, useValueToLabel } from '~/hooks'

import { delLabel, enableDisableLabel, getLabelPageList } from '~/apis/product/label'

defineOptions({
  name: 'ProductLabel',
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Label[],
  modelData: {} as Label,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Label[],
})
const labelTbRef = ref<CommonTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getLabelPageList(state.pageQuery).then((res: Response<Label[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  labelTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  labelTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Label[]) => {
  state.selectTableData = val ?? []
}

const handleCreate = () => {
  useRouterCreate()
}

const handleShow = (id: string) => {
  useRouterShow({ path: id })
}

const handleDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item: Label) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delLabel(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const handleEnableDisable = (row: Label) => {
  useConfirm({ message: `确定${row.status ? '启用' : '禁用'}该标签吗?`, type: 'warning' })
    .then(() => {
      enableDisableLabel(row.id, row.status || false)
        .then((res: Response<any>) => {
          getPageData()
          useMessageSuccess(res.msg)
        })
        .catch(() => {
          row.status = !row.status
        })
    })
    .catch(() => {
      row.status = !row.status
    })
}
</script>
