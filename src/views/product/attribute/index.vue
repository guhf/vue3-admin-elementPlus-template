<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <ConstFilterItem label="规格名称">
        <el-input v-model="state.pageQuery.attributeName" type="text" clearable placeholder="请输入规格名称" />
      </ConstFilterItem>
      <ConstFilterItem label="规格编号">
        <el-input v-model="state.pageQuery.attributeCode" type="text" clearable placeholder="请输入规格编号" />
      </ConstFilterItem>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.attribute.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['product.attribute.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="attributeTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="规格名称" prop="attributeName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="规格编号" prop="attributeCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.attribute.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
        </template>
      </el-table-column>
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouterCreate, useRouterShow, useConfirmDel, useMessageSuccess, useMessageWarning, useDict, useValueToLabel } from '~/hooks'
import { PageQuery } from '~/models/common/pageQueryModel'
import { Response } from '~/models/response'
import { Attribute } from '~/models/product/attributeModel'

import { getAttributePageList, delAttribute } from '~/apis/product/attribute'

defineOptions({
  name: 'ProductAttribute'
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as Attribute[],
  modelData: {} as Attribute,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Attribute[],
})
const attributeTbRef = ref<ConstTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getAttributePageList(state.pageQuery).then((res: Response<Attribute[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  attributeTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  attributeTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Attribute[]) => {
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
  state.selectTableData.forEach((item: Attribute) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delAttribute(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}
</script>