<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <el-input v-model="state.pageQuery.code" type="text" clearable placeholder="请输入通知编号">
        <template #prepend>通知编号</template>
      </el-input>
      <el-input v-model="state.pageQuery.title" type="text" clearable placeholder="请输入通知名称">
        <template #prepend>通知名称</template>
      </el-input>
    </Filter>
    <CommonTable ref="messageTbRef" :data="state.pageListData" :total="state.total" :page-size="state.pageQuery.pageSize" size="small" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="通知编号" prop="code" sortable="custom" width="150" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="通知名称" prop="title" sortable="custom" width="240" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="通知内容" prop="content" sortable="custom" min-width="400" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="发送人" prop="senderName" sortable="custom" width="120" align="center" show-overflow-tooltip />
      <el-table-column label="接收人" prop="receiverName" sortable="custom" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="发送时间" prop="sendTime" sortable="custom" width="150" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="isRead" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-tag v-if="row.isRead" type="success" size="small" effect="light">已读</el-tag>
          <el-tag v-else type="danger" size="small" effect="light">未读</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleShow(row.id)">查看</el-button>
        </template>
      </el-table-column>
    </CommonTable>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useConfirmDel, useMessageSuccess, useMessageWarning, useRouterShow } from '~/hooks'

import { delNotify, getNotifyPageList } from '~/apis/user/notify'

const state = reactive({
  pageListData: [],
  total: 0,
  pageQuery: {
    pageIndex: 1,
    title: '' as string,
    code: '',
  } as any,
  selectTableData: [] as Array<any>,
  enums: {} as any,
})
const messageTbRef = ref<CommonTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getNotifyPageList(state.pageQuery).then((res: any) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
    state.enums = res.enums
  })
}

const filterData = () => {
  messageTbRef.value?.reloadData(1)
}

const resetData = () => {
  state.pageQuery = {}
  messageTbRef.value?.reloadData(1, 20)
}

const reloadTableData = (pageQuery: object) => {
  state.pageQuery = Object.assign(state.pageQuery, pageQuery)
  getPageData()
}

const selectedChange = (val: Array<any>) => {
  state.selectTableData = val ?? []
}

const handleShow = (id: string) => {
  useRouterShow({ path: id })
}

const handleDel = () => {
  const ids = [] as Array<any>
  state.selectTableData.forEach((item) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delNotify(ids.join(',')).then((res: any) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}
</script>

<style scoped></style>
