<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="服务名称">
        <el-input v-model="state.pageQuery.serviceName" type="text" clearable placeholder="请输入服务名称" />
      </FilterItem>
      <FilterItem label="服务编号">
        <el-input v-model="state.pageQuery.serviceCode" type="text" clearable placeholder="请输入服务编号" />
      </FilterItem>
    </Filter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.service.create']" class="btn-item" type="primary" :icon="Edit" @click="handleCreate">添加</el-button>
        <el-button v-permission="['product.service.del']" class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
      </div>
    </div>
    <CommonTable ref="serviceTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="服务名称" prop="serviceName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="服务编号" prop="serviceCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-model="row.status" v-permission="['product.service.enable']" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" @change="handleEnableDisable(row)" />
          <el-tag v-permission:un="['product.service.enable']" :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.service.show']" type="primary" size="small" @click="handleShow(row.id)">查看</el-button>
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
import type { Service } from '~/models/product/serviceModel'
import { useConfirm, useConfirmDel, useDict, useMessageSuccess, useRouterCreate, useRouterShow, useValidateTableDel, useValueToLabel } from '~/hooks'

import { delService, enableDisableService, getServicePageList } from '~/apis/product/service'

defineOptions({
  name: 'ProductService',
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Service[],
  modelData: {} as Service,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Service[],
})
const serviceTbRef = ref<CommonTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getServicePageList(state.pageQuery).then((res: Response<Service[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  serviceTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  serviceTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Service[]) => {
  state.selectTableData = val ?? []
}

const handleCreate = () => {
  useRouterCreate()
}

const handleShow = (id: string) => {
  useRouterShow({ path: id })
}

const handleDel = () => {
  const ids = useValidateTableDel(state.selectTableData)
  if (!ids) return

  useConfirmDel().then(() => {
    delService(ids).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const handleEnableDisable = (row: Service) => {
  useConfirm({ message: `确定${row.status ? '启用' : '禁用'}该服务吗?`, type: 'warning' })
    .then(() => {
      enableDisableService(row.id, row.status || false)
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
