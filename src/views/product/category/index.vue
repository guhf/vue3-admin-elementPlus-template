<template>
  <div class="app-container">
    <div class="l-tree-r-table">
      <div class="l-container">
        <!-- 左侧树 -->
        <ConstTree ref="authTree" :data="state.treeData">
          
        </ConstTree>
      </div>
      <div class="r-container">
        <div class="r-description">
          <div class="table-tool">
            <div class="btn-container">
              <el-button v-permission="['sys.dict.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
              <el-button v-permission="['sys.dict.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
            </div>
          </div>
          <el-descriptions title="" :column="2" border>
            <el-descriptions-item label="字典编号">{{ state.modelData.dictCode }}</el-descriptions-item>
            <el-descriptions-item label="字典名称">{{ state.modelData.dictName }}</el-descriptions-item>
            <el-descriptions-item label="字典类型">{{ state.modelData.dictType }}</el-descriptions-item>
            <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{ state.modelData.remark }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="r-table">
          <ConstTable ref="dictTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
            <el-table-column label="字典明细编号" prop="dictCode" sortable="custom" width="200" header-align="center" align="left" fixed="left" show-overflow-tooltip />
            <el-table-column label="字典名称" prop="dictName" sortable="custom" width="200" header-align="center" align="left" fixed="left" show-overflow-tooltip />
            <el-table-column label="字典键值" prop="dictName" sortable="custom" width="200" header-align="center" align="left" fixed="left" show-overflow-tooltip />
            <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
              <template #default="{ row }">
                <el-tag v-if="row.status" type="success" size="small" effect="light">正常</el-tag>
                <el-tag v-else type="danger" size="small" effect="light">禁用</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed="right">
              <template #default="{ row }">
                <el-button v-permission="['sys.dict.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
                <el-button v-permission="['sys.dict.resetpwd']" type="warning" size="small" @click="mReset(row.id)">重置密码</el-button>
              </template>
            </el-table-column>
          </ConstTable>
        </div>
      </div>
    </div>
    <!-- <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>用户编号</label>
        <el-input v-model="state.pageQuery.dictCode" type="text" clearable placeholder="请输入用户编号" />
      </div>
      <div class="filter-item">
        <label>用户名称</label>
        <el-input v-model="state.pageQuery.dictName" type="text" clearable placeholder="请输入用户名称" />
      </div>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.dict.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.dict.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useConfirm, useConfirmDel, useMessageSuccess, useMessageWarning } from '@/hooks/web/message'
import { useRouterCreate, useRouterShow } from '@/hooks/web/router'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Response } from '@/models/response'
import { Dict, DictItem } from '@/models/sys/dictModel'

import { delDict } from '@/apis/sys/dict'

defineOptions({
  name: 'SysDict'
})

const state = reactive({
  treeData: [] as Dict[],
  modelData: {} as Dict,
  pageListData: [] as DictItem[],
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as Dict[],
})
const dictTbRef = ref<ConstTable>()

onMounted(() => {
  // getTreeData()
})

const getTreeData = () => {
  // getDictTreeList().then((res: Response<Dict[]>) => {
  //   state.treeData = res.data
  //   state.total = res.total ?? 0
  // })
}

const getItemData = () => {
  // getDictItemList().then((res: Response<Dict[]>) => {
  //   state.treeData = res.data
  //   state.total = res.total ?? 0
  // })
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
  // getPageData()
}

const selectedChange = (val: Dict[]) => {
  state.selectTableData = val ?? []
}

const mReset = (id: string) => {
  useConfirm({ message: '确认重置该用户密码吗？', type: 'warning' }).then(() => {
    // resetPwd(id).then((res: Response<any>) => {
    //   useMessageSuccess(res.msg)
    // })
  })
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
      // getPageData()
    })
  })
}
</script>