<template>
  <div class="app-container">
    <const-filter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>用户名称</label>
        <el-input v-model="state.pageQuery.userName" type="text" clearable placeholder="请输入用户/账号名称" />
      </div>
    </const-filter>
    <const-table ref="userloginTbRef" :data="state.pageListData" :total="state.total" height="calc(100vh - 254px)" :check="false" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="用户名称" prop="userName" sortable="custom" width="120" align="center" fixed="left" show-overflow-tooltip />
      <el-table-column label="账号名称" prop="accountName" sortable="custom" width="120" align="center" show-overflow-tooltip />
      <el-table-column label="登录IP" prop="ip" sortable="custom" width="120" align="center" show-overflow-tooltip />
      <el-table-column label="操作系统" prop="os" sortable="custom" width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="浏览器UA" prop="browserUA" sortable="custom" min-width="600" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="登录状态说明" prop="loginDesc" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="登陆时间" prop="loginDateTime" sortable="custom" width="180" align="center" fixed="right" show-overflow-tooltip />
      <el-table-column label="登录状态" prop="loginType" sortable="custom" width="120" align="center" fixed="right">
        <template #default="{row}">
          <el-tag v-if="row.loginType === 1" type="success" size="small" effect="light">登录成功</el-tag>
          <el-tag v-else-if="row.loginType === 2" type="success" size="small" effect="light">刷新Token</el-tag>
          <el-tag v-else-if="row.loginType === 3" type="danger" size="small" effect="light">登录失败</el-tag>
        </template>
      </el-table-column>
    </const-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
// import { useRouterShow } from '@/hooks/web/useRouter'
import { PageQuery } from '@/models/common/pageQueryModel'
import { Response } from '@/models/response'
import { userLogin } from '@/models/log/userLoginModel'

import { getUserLoginLogPageList } from '@/apis/sys/userLoginLog'

onMounted(() => {
  getPageData()
})

const state = reactive({
  pageListData: [] as userLogin[],
  total: 0,
  pageQuery: {
    pageIndex: 1
  } as PageQuery,
  selectTableData: [] as userLogin[]
})
const userloginTbRef = ref<ConstTable>()

const getPageData = () => {
  getUserLoginLogPageList(state.pageQuery)
    .then((res: Response<userLogin[]>) => {
      state.pageListData = res.data
      state.total = res.total || 0
    })
}

const filterData = () => {
  userloginTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = { pageIndex: 1};
  userloginTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: object) => {
  Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: userLogin[]) => {
  state.selectTableData = val ?? []
}

// const mShow = (id: string) => {
//   useRouterShow({ path: id })
// }
</script>
