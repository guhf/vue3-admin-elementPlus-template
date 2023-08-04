<template>
  <div class="app-main-wrapper">
    <Filter @search="filterData" @reset="resetData">
      <FilterItem label="通知编号">
        <el-input v-model="state.pageQuery.code" type="text" clearable placeholder="请输入通知编号" />
      </FilterItem>
      <FilterItem label="通知名称">
        <el-input v-model="state.pageQuery.title" type="text" clearable placeholder="请输入通知名称" />
      </FilterItem>
    </Filter>
    <div class="table-tool">
      <div class="btn-container">
        <el-button class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
        <el-button class="btn-item" type="primary" :icon="Reading" @click="handleRead">标记已读</el-button>
        <el-button class="btn-item" type="primary" :icon="Reading" @click="handleAllRead">全部已读</el-button>
      </div>
    </div>
    <CommonTable ref="messageTbRef" :data="state.pageListData" :total="state.total" :page-size="state.pageQuery.pageSize" size="small" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="通知编号" prop="code" sortable="custom" width="150" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="通知名称" prop="title" sortable="custom" width="240" header-align="center" align="left" fixed="left" show-overflow-tooltip />
      <el-table-column label="通知内容" prop="content" sortable="custom" min-width="400" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="发送人" prop="senderName" sortable="custom" width="120" align="center" show-overflow-tooltip />
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
import { Delete, Reading } from '@element-plus/icons-vue'
import type { Message } from '~/models/common/messageModel'
import { useConfirmDel, useMessageSuccess, useMessageWarning, useRouterShow } from '~/hooks'

import { delMessage, getMessagePageList, updateAllFlag, updateFlag } from '~/apis/user/message'

const state = reactive({
  pageListData: [] as Message[],
  total: 0,
  pageQuery: {
    pageIndex: 1,
    title: '' as string,
    code: '',
  } as any,
  selectTableData: [] as Message[],
})
const messageTbRef = ref<CommonTable>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getMessagePageList(state.pageQuery).then((res: any) => {
    state.pageListData = res.data
    state.total = res.total ?? 0
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

const selectedChange = (val: Message[]) => {
  state.selectTableData = val ?? []
}

const handleShow = (id: string) => {
  useRouterShow({ path: id })
}

const handleDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delMessage(ids).then((res: any) => {
      useMessageSuccess(res.msg)
      state.pageQuery.pageIndex = 1
      getPageData()
    })
  })
}

const handleRead = () => {
  const ids = state.selectTableData.map((item) => {
    return item.id
  })

  if (ids.length < 1) {
    useMessageWarning('请先选择需要已读的数据！')
    return
  }

  updateFlag(ids).then((res: any) => {
    useMessageSuccess(res.msg)
    state.pageQuery.pageIndex = 1
    getPageData()
  })
}

const handleAllRead = () => {
  updateAllFlag().then((res: any) => {
    useMessageSuccess(res.msg)
    state.pageQuery.pageIndex = 1
    getPageData()
  })
}
</script>

<style scoped></style>
