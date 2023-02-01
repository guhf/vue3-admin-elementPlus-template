<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>规格模板名称</label>
        <el-input v-model="state.pageQuery.attrTemplateName" type="text" clearable placeholder="请输入规格模板名称" />
      </div>
      <div class="filter-item">
        <label>规格模板编号</label>
        <el-input v-model="state.pageQuery.attrTemplateCode" type="text" clearable placeholder="请输入规格模板编号" />
      </div>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['product.attrtemplate.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['product.attrtemplate.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="attrTemplateTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="规格模板名称" prop="attrTemplateName" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="规格模板编号" prop="attrTemplateCode" sortable="custom" min-width="200" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['product.attrtemplate.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
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
import { AttrTemplate } from '@/models/product/attrTemplateModel'

import { getAttrTemplatePageList, delAttrTemplate } from '@/apis/product/attrTemplate'

defineOptions({
  name: 'ProductAttrTemplate'
})

const { commonStatus } = useDict()
const state = reactive({
  pageListData: [] as AttrTemplate[],
  modelData: {} as AttrTemplate,
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as AttrTemplate[],
})
const attrTemplateTbRef = ref<ConstTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getAttrTemplatePageList(state.pageQuery).then((res: Response<AttrTemplate[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  attrTemplateTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  attrTemplateTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: AttrTemplate[]) => {
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
  state.selectTableData.forEach((item: AttrTemplate) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delAttrTemplate(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}
</script>