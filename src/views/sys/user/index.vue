<template>
  <div class="app-container">
    <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>用户编号</label>
        <el-input v-model="state.pageQuery.userCode" type="text" clearable placeholder="请输入用户编号" />
      </div>
      <div class="filter-item">
        <label>用户名称</label>
        <el-input v-model="state.pageQuery.userName" type="text" clearable placeholder="请输入用户名称" />
      </div>
    </ConstFilter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.user.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.user.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable ref="userTbRef" :data="state.pageListData" :total="state.total" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="用户编号" prop="userCode" sortable="custom" width="200" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="用户名称" prop="userName" sortable="custom" width="200" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="性别" prop="sex" sortable="custom" width="80" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag :type="row.sex === 1 ? '' : (row.sex === 0 ? 'danger' : 'info')" size="small" effect="light">
            {{ useValueToLabel(commonSex, row.sex) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="角色" prop="roles" sortable="custom" min-width="120" header-align="center" align="left" show-overflow-tooltip>
        <template #default="{ row }">
          <el-space v-if="row.userRoles" wrap>
            <el-tag v-for="(role, index) in row.userRoles" :key="index" size="small" effect="light">{{ role.roleName }}</el-tag>
          </el-space>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['sys.user.show']" type="primary" size="small" @click="mShow(row.id)">查看</el-button>
          <el-button v-permission="['sys.user.resetpwd']" type="warning" size="small" @click="mReset(row.id)">重置密码</el-button>
        </template>
      </el-table-column>
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouterCreate, useRouterShow, useConfirm, useConfirmDel, useMessageSuccess, useMessageWarning, useDict, useValueToLabel } from '@/hooks'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Response } from '@/models/response'
import { User } from '@/models/sys/userModel'

import { getUserPageList, delUser, resetPwd } from '@/apis/sys/user'

defineOptions({
  name: 'SysUser'
})

const { commonSex, commonStatus } = useDict()
const state = reactive({
  pageListData: [] as User[],
  total: 0,
  pageQuery: {} as PageQuery,
  selectTableData: [] as User[],
})
const userTbRef = ref<ConstTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getUserPageList(state.pageQuery).then((res: Response<User[]>) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
  })
}

const filterData = () => {
  userTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  userTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: PageQuery) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: User[]) => {
  state.selectTableData = val ?? []
}

const mReset = (id: string) => {
  useConfirm({ message: '确认重置该用户密码吗？', type: 'warning' }).then(() => {
    resetPwd(id).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
    })
  })
}

const mCreate = () => {
  useRouterCreate()
}

const mShow = (id: string) => {
  useRouterShow({ path: id })
}

const mDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item: User) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delUser(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}
</script>