<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="用户名称">
        <el-input v-model="state.pageQuery.userName" type="text" clearable placeholder="请输入用户/账号名称" />
      </FilterItem>
    </Filter>
    <CommonTable ref="userloginTbRef" :data="state.pageListData" :total="state.total" :check="false" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="用户名称" prop="userName" sortable="custom" width="150" align="center" fixed="left" show-overflow-tooltip />
      <el-table-column label="账号名称" prop="accountName" sortable="custom" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="登录IP" prop="ip" sortable="custom" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="操作系统" prop="os" sortable="custom" width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="浏览器UA" prop="browserUA" sortable="custom" min-width="600" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="登录状态说明" prop="loginDesc" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="登陆时间" prop="loginDateTime" sortable="custom" width="180" align="center" fixed="right" show-overflow-tooltip />
      <el-table-column label="登录状态" prop="loginType" sortable="custom" width="120" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag :type="row.loginType === 1 ? 'success' : row.loginType === 3 ? 'danger' : 'warning'" size="small" effect="light">
            {{ useValueToLabel(loginStatus, row.loginType) }}
          </el-tag>
          <!-- <el-tag v-if="row.loginType === 1" type="success" size="small" effect="light">登录成功</el-tag>
            <el-tag v-else-if="row.loginType === 2" type="success" size="small" effect="light">刷新Token</el-tag>
            <el-tag v-else-if="row.loginType === 3" type="danger" size="small" effect="light">登录失败</el-tag> -->
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { PageQuery } from '~/models/common/pageQueryModel'
import type { Response } from '~/models/response'
import type { userLogin } from '~/models/log/userLoginModel'
import { useDict, useValueToLabel } from '~/hooks'

import { getUserLoginLogPageList } from '~/apis/sys/userLoginLog'

onMounted(() => {
  getPageData()
})

const { loginStatus } = useDict()
const state = reactive({
  pageListData: [] as userLogin[],
  total: 0,
  pageQuery: {
    pageIndex: 1,
  } as PageQuery,
  selectTableData: [] as userLogin[],
})
const userloginTbRef = ref<CommonTable>()

const getPageData = () => {
  getUserLoginLogPageList(state.pageQuery).then((res: Response<userLogin[]>) => {
    state.pageListData = res.data
    state.total = res.total || 0
  })
}

const filterData = () => {
  userloginTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1 }
  userloginTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: object) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: userLogin[]) => {
  state.selectTableData = val ?? []
}

// const handleShow = (id: string) => {
//   useRouterShow({ path: id })
// }
</script>
