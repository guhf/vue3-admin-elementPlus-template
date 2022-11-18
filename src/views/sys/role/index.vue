<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>角色名称</label>
        <el-input v-model="state.pageQuery.roleName" type="text" clearable placeholder="请输入角色名称" />
      </div>
      <div class="filter-item">
        <label>角色标识</label>
        <el-input v-model="state.pageQuery.roleCode" type="text" clearable placeholder="请输入角色标识" />
      </div>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.role.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.role.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="roleTbRef" :data="state.pageListData" :total="state.total" :pageSize="state.pageQuery.pageSize" :canCheck="canCheck" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="角色名称" prop="roleName" sortable="custom" width="120" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="角色标识" prop="roleCode" sortable="custom" width="120" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="描述" prop="description" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag v-if="row.status" type="success" size="small" effect="light">正常</el-tag>
          <el-tag v-else type="danger" size="small" effect="light">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['sys.role.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
          <el-button v-permission="['sys.role.auth']" type="primary" size="small" @click="mGetAuth(row.id)">分配权限</el-button>
        </template>
      </el-table-column>
    </ConstTable>
    <TreeDialog ref="roleAuthDialogRef" title="分配权限" :tree-data="state.treeData" :btns="['save']" @save="mSetAuth">
    </TreeDialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouterCreate, useRouterShow } from '@/hooks/web/router'
import { useConfirmDel, useMessageSuccess, useMessageWarning } from '@/hooks/web/message'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Response } from '@/models/response'
import { Role } from '@/models/sys/roleModel'
import { Tree } from '@/models/common/treeModel'
import TreeDialog from '@/components/ConstDialog/TreeDialog/index.vue'

import { getRolePageList, delRole } from '@/apis/sys/role'
import { getRoleMenuTreeList } from '@/apis/sys/menu'
import { setAuth } from '@/apis/sys/role'
import { TreeData } from 'element-plus/es/components/tree/src/tree.type'

defineOptions({
  name: 'SysRole'
})

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

const roleTbRef = ref<ConstTable>()
const roleAuthDialogRef = ref<ConstDialog>()

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

const mCreate = () => {
  useRouterCreate()
}

const mShow = (id: string) => {
  useRouterShow({ path: id })
}

const mDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item: Role) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delRole(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

// const mEnable = (id: number) => {
//   confirm({ message: "确定启用该角色吗？", type: "warning" }).then(()=> {
//     enableMenu(id).then((res: any) => {
//       getPageData();
//       messageSuccess(res.msg);
//     }).catch(() => {});
//   }).catch(() => {});
// };

// const mDisable = (id: number) => {
//   confirm({ message: "确定禁用该角色吗？", type: "warning" }).then(()=> {
//     disableMenu(id).then((res: any) => {
//       getPageData();
//       messageSuccess(res.msg);
//     }).catch(() => {});
//   }).catch(() => {});
// };

const mGetAuth = (id: string) => {
  roleAuthDialogRef.value?.open()
  state.roleId = id
  getRoleMenuTreeList(id).then((res: Response<Tree>) => {
    if (res.data != null) {
      state.treeData = res.data
    }
  })
}

const mSetAuth = (checkData: TreeData) => {
  if (checkData.length < 1) {
    useMessageWarning('请选择需要分配的权限')
    return
  }
  const authData = [] as string[]

  checkData.forEach((item: any) => {
    authData.push(item.id)
  })

  setAuth(state.roleId, authData)
    .then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      roleAuthDialogRef.value?.close()
    })
    .catch((error) => {
    })
}
</script>