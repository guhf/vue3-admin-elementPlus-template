<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <ConstFilterItem label="服务名称">
        <el-input v-model="state.pageQuery.serviceName" type="text" clearable placeholder="请输入服务名称" />
      </ConstFilterItem>
      <ConstFilterItem label="服务编号">
        <el-input v-model="state.pageQuery.serviceCode" type="text" clearable placeholder="请输入服务编号" />
      </ConstFilterItem>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.service.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['product.service.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="serviceTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="服务名称" prop="serviceName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="服务编号" prop="serviceCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-permission="['product.service.enable']" v-model="row.status" @change="mEnableDisable(row)" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" />
          <el-tag v-permission:un="['product.service.enable']" :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.service.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
        </template>
      </el-table-column>
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouterCreate, useRouterShow, useConfirm, useConfirmDel, useMessageSuccess, useMessageWarning, useDict, useValueToLabel } from '~/hooks'
import { PageQuery } from '~/models/common/pageQueryModel'
import { Response } from '~/models/response'
import { Service } from '~/models/product/serviceModel'

import { getServicePageList, delService, enableDisableService } from '~/apis/product/service'

defineOptions({
  name: 'ProductService'
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Service[],
  modelData: {} as Service,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Service[],
})
const serviceTbRef = ref<ConstTable>()

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

const mCreate = () => {
  useRouterCreate()
}

const mShow = (id: string) => {
  useRouterShow({ path:  id })
}

const mDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item: Service) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delService(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const mEnableDisable = (row: Service) => {
  useConfirm({ message: `确定${ row.status ? '启用' : '禁用' }该服务吗?`, type: 'warning' }).then(() => {
    enableDisableService(row.id, row.status || false).then((res: Response<any>) => {
      getPageData()
      useMessageSuccess(res.msg)
    }).catch(() =>{
      row.status = !row.status
    })
  }).catch(() =>{
    row.status = !row.status
  })
}
</script>