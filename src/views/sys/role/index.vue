<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="角色名称">
        <el-input v-model="state.pageQuery.roleName" type="text" clearable placeholder="请输入角色名称" />
      </FilterItem>
      <FilterItem label="角色标识">
        <el-input v-model="state.pageQuery.roleCode" type="text" clearable placeholder="请输入角色标识" />
      </FilterItem>
    </Filter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.role.create']" class="btn-item" type="primary" :icon="Edit" @click="handleCreate">添加</el-button>
        <el-button v-permission="['sys.role.del']" class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
      </div>
    </div>
    <CommonTable ref="roleTbRef" :data="state.pageListData" :total="state.total" :page-size="state.pageQuery.pageSize" :can-check="canCheck" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="角色名称" prop="roleName" sortable="custom" width="120" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="角色标识" prop="roleCode" sortable="custom" width="120" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="描述" prop="description" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['sys.role.show']" type="primary" size="small" @click="handleShow(row.id)">查看</el-button>
          <el-button v-permission="['sys.role.auth']" type="primary" size="small" @click="openDialog(row.id)">分配权限</el-button>
        </template>
      </el-table-column>
    </CommonTable>

    <!-- 分配权限 -->
    <TreeDialog ref="roleAuthDialogRef" v-model="roleAuthDialogVisible" title="分配权限" :btns="['save']" :load="getRoleMenuTreeList(state.roleId)" :load-params="state.roleId" @save="handleSetAuth" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import type { TreeData } from 'element-plus/es/components/tree/src/tree.type'
import type { PageQuery } from '~/models/common/pageQueryModel'
import type { Response } from '~/models/response'
import type { Role } from '~/models/sys/roleModel'
import type { Tree } from '~/models/common/treeModel'
import { useConfirmDel, useDict, useMessageSuccess, useMessageWarning, useRouterCreate, useRouterShow, useValidateTableDel, useValueToLabel } from '~/hooks'
import TreeDialog from '~/components/dialog/tree-dialog.vue'

import { delRole, getRolePageList, setAuth } from '~/apis/sys/role'
import { getRoleMenuTreeList } from '~/apis/sys/menu'

defineOptions({
  name: 'SysRole',
})

const { commonStatus } = useDict()
const roleTbRef = ref<CommonTable>()
const roleAuthDialogVisible = ref(false)
const state = reactive({
  pageListData: [] as Role[],
  total: 0,
  pageQuery: {
    pageIndex: 1,
    roleName: '',
    roleCode: '',
  } as PageQuery,
  selectTableData: [] as Role[],
  roleId: '',
  treeData: [] as Tree,
})

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getRolePageList(state.pageQuery).then((res: Response<Role[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  roleTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  roleTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Role[]) => {
  state.selectTableData = val ?? []
}

const canCheck = (row: Role) => {
  return row.roleType !== 1
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
    delRole(ids).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const openDialog = (id: string) => {
  state.roleId = id
  roleAuthDialogVisible.value = true
}

const handleSetAuth = (checkData: TreeData) => {
  if (checkData.length < 1) {
    useMessageWarning('请选择需要分配的权限')
    return
  }
  const authData = [] as string[]

  checkData.forEach((item: any) => {
    authData.push(item.id)
  })

  setAuth(state.roleId, authData).then((res: Response<any>) => {
    useMessageSuccess(res.msg)
    roleAuthDialogVisible.value = false
  })
}
</script>
