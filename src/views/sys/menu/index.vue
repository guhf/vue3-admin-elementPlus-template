<template>
  <div class="app-container">
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.menu.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.menu.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable :data="state.pageListData" height="calc(100vh - 206px)" :pagination="false" rowKey="id" :treeProps="{ children: 'children', hasChildren: 'hasChildren' }" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="菜单名称" prop="menuName" sortable="custom" width="200" header-align="center" align="left" fixed show-overflow-tooltip />
      <el-table-column label="菜单类型" prop="menuType" sortable="custom" width="120" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag :type="row.menuType === 3 ? 'info' : ''" size="small" effect="light">
            {{ useValueToLabel(sysMenuType, row.menuType) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图标" prop="icon" sortable="custom" width="80" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <SvgIcon :icon-name="row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="菜单标识" prop="menuCode" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="权限标识" prop="authority" sortable="custom" min-width="150" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="菜单路由" prop="path" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="菜单地址" prop="component" sortable="custom" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="接口地址" prop="url" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-permission="['sys.menu.enable']" v-model="row.status" @change="mEnableDisable(row)" />
          <el-tag v-permission:un="['sys.menu.enable']" :type="row.status ? 'success' : 'danger'" size="small" effect="light">
            {{ useValueToLabel(commonStatus, row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center" fixed="right">
        <template #default="{ row }">
          <el-button v-permission="['sys.menu.update']" type="primary" size="small" @click="mEdit(row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </ConstTable>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useConfirm, useConfirmDel, useMessageSuccess, useMessageWarning } from '@/hooks/web/message'
import { useRouterCreate, useRouterPush } from '@/hooks/web/router'
import { useDict, useValueToLabel } from '@/hooks/event/dict'
import { Response } from '@/models/response'
import { MenuTree, Menu } from '@/models/sys/menuModel'

import { getMenuTreeList, delMenu, enableDisableMenu } from '@/apis/sys/menu'

defineOptions({
  name: 'SysMenu'
})

const { sysMenuType, commonStatus } = useDict()
const state = reactive({
  pageListData: [] as MenuTree,
  selectTableData: [] as Menu[],
})

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getMenuTreeList().then((res: Response<MenuTree>) => {
    state.pageListData = res.data
  })
}

const reloadTableData = () => {
  getPageData()
}

const selectedChange = (val: Menu[]) => {
  state.selectTableData = val
}

const mCreate = () => {
  useRouterCreate()
}

const mEdit = (id: string) => {
  useRouterPush({ path: `menu/update/${id}` })
}

const mDel = () => {
  const ids = [] as string[]
  state.selectTableData.forEach((item) => {
    ids.push(item.id)
  })
  if (ids.length < 1) {
    useMessageWarning('请先选择需要删除的数据！')
    return
  }

  useConfirmDel().then(() => {
    delMenu(ids.join(',')).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      getPageData()
    })
  }).catch(() =>{
  })
}

const mEnableDisable = (row: Menu) => {
  useConfirm({ message: `确定${ row.status ? '启用' : '禁用' }该菜单吗?`, type: 'warning' }).then(() => {
    enableDisableMenu(row.id, row.status || false).then((res: Response<any>) => {
      getPageData()
      useMessageSuccess(res.msg)
    }).catch(() =>{
      row.status = !row.status
    })
  }).catch(() =>{
    row.status = !row.status
  })
}
</script>