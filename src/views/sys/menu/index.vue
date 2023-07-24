<template>
  <div class="app-main-wrapper">
    <div class="table-tool">
      <div class="btn-container">
        <el-button v-permission="['sys.menu.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加</el-button>
        <el-button v-permission="['sys.menu.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
      </div>
    </div>
    <ConstTable :data="state.pageListData" :pagination="false" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" :expand-row-keys="expandRowKeys" @reload="reloadTableData" @selection-change="selectedChange">
      <el-table-column label="菜单名称" prop="menuName" sortable="custom" width="200" header-align="center" align="left" fixed show-overflow-tooltip />
      <el-table-column label="菜单类型" prop="menuType" sortable="custom" width="120" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag :type="row.menuType === 3 ? 'info' : ''" size="small" effect="light">
            {{ useValueToLabel(sysMenuType, row.menuType) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="图标" prop="icon" width="80" align="center" show-overflow-tooltip>
        <template #default="{ row }">
          <SvgIcon :icon-name="row.icon" />
        </template>
      </el-table-column>
      <el-table-column label="菜单标识" prop="menuCode" sortable="custom" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="权限标识" prop="authority" sortable="custom" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="菜单路由" prop="path" sortable="custom" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="菜单地址" prop="component" sortable="custom" min-width="240" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="接口地址" prop="url" sortable="custom" min-width="200" header-align="center" align="left" show-overflow-tooltip />
      <el-table-column label="排序号" prop="sortNo" sortable="custom" width="100" align="center" show-overflow-tooltip />
      <el-table-column label="状态" prop="status" sortable="custom" width="90" align="center" fixed="right">
        <template #default="{ row }">
          <el-switch v-model="row.status" v-permission="['sys.menu.enable']" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" @change="mEnableDisable(row)" />
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
import { onMounted, reactive, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Menu, MenuTree } from '~/models/sys/menuModel'
import { useConfirm, useConfirmDel, useDict, useMessageSuccess, useMessageWarning, useRouterCreate, useRouterPush, useValueToLabel } from '~/hooks'

import { delMenu, enableDisableMenu, getMenuTreeList } from '~/apis/sys/menu'

defineOptions({
  name: 'SysMenu',
})

const { sysMenuType, commonStatus } = useDict()
const state = reactive({
  pageListData: [] as MenuTree,
  selectTableData: [] as Menu[],
})

onMounted(() => {
  getPageData()
})

const expandRowKeys = ref<string[]>([])
const getPageData = () => {
  getMenuTreeList().then((res: Response<MenuTree>) => {
    state.pageListData = res.data
    ;(state.pageListData || []).forEach((item) => {
      expandRowKeys.value.push(item.id)
    })
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
  })
}

const mEnableDisable = (row: Menu) => {
  useConfirm({ message: `确定${row.status ? '启用' : '禁用'}该菜单吗?`, type: 'warning' })
    .then(() => {
      enableDisableMenu(row.id, row.status || false)
        .then((res: Response<any>) => {
          getPageData()
          useMessageSuccess(res.msg)
        })
        .catch(() => {
          row.status = !row.status
        })
    })
    .catch(() => {
      row.status = !row.status
    })
}
</script>
