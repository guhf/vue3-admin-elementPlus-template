<template>
  <div class="app-main-wrapper">
    <div class="l-tree-r-table">
      <div class="l-container">
        <!-- 左侧树 -->
        <Tree ref="authTree" :data="state.treeData" :default-expanded-keys="expandKeys" @node-click="getData" />
      </div>
      <div class="r-container">
        <div class="r-description">
          <div class="table-tool">
            <div class="btn-container">
              <el-button v-if="state.checkData.categotyId" v-permission="['product.category.update']" class="btn-item" type="primary" :icon="Edit" @click="handleUpdate">编辑</el-button>
              <el-button v-permission="['product.category.create']" class="btn-item" type="primary" :icon="Edit" @click="handleCreate">添加下级</el-button>
              <TreeDialog
                v-if="state.checkData.categotyId"
                ref="categoryDialogRef"
                v-model:dialog-visible="categoryDialogVisible"
                v-permission="['product.category.update']"
                button
                btn-text="移动"
                btn-size=""
                :btn-icon="Rank"
                radio
                title="商品分类"
                :load="getCategoryExcludeTreeList"
                :load-params="state.checkData.categotyId"
                @confirm="handleMove"
              />
              <el-button v-if="state.checkData.categotyId" v-permission="['product.category.del']" class="btn-item" type="danger" :icon="Delete" @click="handleDel">删除</el-button>
            </div>
          </div>
          <el-descriptions v-if="state.modelData.id" title="" :column="2" border>
            <el-descriptions-item label="上级分类" :span="2">{{ state.modelData.parentName }}</el-descriptions-item>
            <el-descriptions-item label="分类编号">{{ state.modelData.categoryCode }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ state.modelData.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="分类图片">
              <el-image v-if="state.modelData.categoryImg" style="height: 50px" :src="state.modelData.categoryImg" :preview-src-list="[state.modelData.categoryImg || '']" fit="cover" />
            </el-descriptions-item>
            <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
            <el-descriptions-item label="描述">{{ state.modelData.description }}</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="r-table">
          <CommonTable ref="categoryTbRef" :data="state.modelData.categoryItems" :height="state.modelData.id ? 'calc(100vh - 349px)' : 'calc(100vh - 155px)'">
            <el-table-column label="分类编号" prop="categoryCode" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="分类名称" prop="categoryName" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="分类图片" prop="categoryImg" min-width="200" align="center" show-overflow-tooltip>
              <template #default="{ row }">
                <el-image v-if="row.categoryImg" style="height: 50px" :src="row.categoryImg" :preview-src-list="[row.categoryImg || '']" fit="cover" />
              </template>
            </el-table-column>
            <el-table-column label="排序号" prop="sortNo" width="120" align="center" show-overflow-tooltip />
            <el-table-column label="描述" prop="description" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="状态" prop="status" width="80" align="center" fixed="right">
              <template #default="{ row }">
                <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
                  {{ useValueToLabel(commonStatus, row.status) }}
                </el-tag>
              </template>
            </el-table-column>
          </CommonTable>
        </div>
      </div>
    </div>
    <CommonDialog ref="editDialogRef" v-model="categoryEditDialogVisible" :title="'添加商品分类'" :btns="['save']" @save="handleSave">
      <CategoryEdit ref="categoryEditRef" :params="state.editParams" />
    </CommonDialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { Delete, Edit, Rank } from '@element-plus/icons-vue'
import CategoryEdit from './edit.vue'
import type { TreeData } from 'element-plus/es/components/tree/src/tree.type'
import type { TreeItem, Tree as TreeModel } from '~/models/common/treeModel'
import type { Response } from '~/models/response'
import type { Category } from '~/models/product/categoryModel'

import { useConfirm, useConfirmDel, useDict, useMessageSuccess, useValueToLabel } from '~/hooks'

import { delCategory, getCategory, getCategoryExcludeTreeList, getCategoryTreeList, moveCategory } from '~/apis/product/category'
import Tree from '~/components/tree/index.vue'
import TreeDialog from '~/components/dialog/tree-dialog.vue'

defineOptions({
  name: 'ProductCategory',
})

const { commonStatus } = useDict()
const categoryTbRef = ref<CommonTable>()
const categoryEditRef = ref<ComponentRef>()
const categoryDialogVisible = ref(false)
const categoryEditDialogVisible = ref(false)
const state = reactive({
  treeData: [] as TreeModel,
  modelData: {} as Category,
  checkData: {
    categotyId: '',
    categoryName: '',
  },
  editParams: {
    id: '',
    parentId: '',
    parentName: '',
  },
})

onMounted(() => {
  getTreeData()
})

const expandKeys = ref<string[]>([])
const getTreeData = () => {
  getCategoryTreeList().then((res: Response<TreeModel>) => {
    state.treeData = res.data
    expandKeys.value.push(state.treeData[0]?.id)
  })
}

const getData = (data: TreeItem) => {
  if (!data.id) {
    state.checkData = { categotyId: '', categoryName: '' }
    state.modelData = { id: '' }
    return
  }
  state.checkData = { categotyId: data.id, categoryName: data.label }
  getCategory(data.id).then((res: Response<Category>) => {
    state.modelData = res.data
  })
}

const handleUpdate = () => {
  state.editParams.id = state.checkData.categotyId
  state.editParams.parentId = ''
  state.editParams.parentName = ''
  categoryEditDialogVisible.value = true
}

const handleCreate = () => {
  state.editParams.id = ''
  state.editParams.parentId = state.checkData.categotyId
  state.editParams.parentName = state.checkData.categoryName
  categoryEditDialogVisible.value = true
}

const handleMove = (data: TreeData) => {
  useConfirm({ message: '确定移动至该分类下吗?', type: 'warning' }).then(() => {
    moveCategory(state.checkData.categotyId, data[0].id).then((res: Response<any>) => {
      getTreeData()
      useMessageSuccess(res.msg)
      categoryDialogVisible.value = false
    })
  })
}

const handleSave = async () => {
  categoryEditRef.value?.save().then(() => {
    getTreeData()
    categoryEditDialogVisible.value = false
  })
}

const handleDel = () => {
  useConfirmDel({ message: '确定删除当前分类及其子级分类吗？' }).then(() => {
    delCategory([state.checkData.categotyId]).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      getTreeData()
    })
  })
}
</script>
