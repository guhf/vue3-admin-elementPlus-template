<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <ConstFilterItem label="品牌名称">
        <el-input v-model="state.pageQuery.brandName" type="text" clearable placeholder="请输入品牌名称" />
      </ConstFilterItem>
      <ConstFilterItem label="品牌编号">
        <el-input v-model="state.pageQuery.brandCode" type="text" clearable placeholder="请输入品牌编号" />
      </ConstFilterItem>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.brand.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['product.brand.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="brandTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="品牌名称" prop="brandName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="品牌编号" prop="brandCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="品牌Logo" prop="brandImg" min-width="200" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-image v-if="row.brandImg" style="height: 50px" :src="row.brandImg" :preview-src-list="[row.brandImg || '']" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="description" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-permission="['product.brand.enable']" v-model="row.status" @change="mEnableDisable(row)" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" />
          <el-tag v-permission:un="['product.brand.enable']" :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.brand.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
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
import { Brand } from '~/models/product/brandModel'

import { getBrandPageList, delBrand, enableDisableBrand } from '~/apis/product/brand'

defineOptions({
  name: 'ProductBrand'
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Brand[],
  modelData: {} as Brand,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Brand[],
})
const brandTbRef = ref<ConstTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getBrandPageList(state.pageQuery).then((res: Response<Brand[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  brandTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  brandTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Brand[]) => {
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
  state.selectTableData.forEach((item: Brand) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delBrand(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const mEnableDisable = (row: Brand) => {
  useConfirm({ message: `确定${ row.status ? '启用' : '禁用' }该品牌吗?`, type: 'warning' }).then(() => {
    enableDisableBrand(row.id, row.status || false).then((res: Response<any>) => {
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