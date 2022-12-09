<template>
  <div class="app-container">
    <div class="l-tree-r-table">
      <div class="l-container">
        <!-- 左侧树 -->
        <ConstTree ref="authTree" :data="state.treeData" :default-expanded-keys="expandKeys" @node-click="getData"></ConstTree>
      </div>
      <div class="r-container">
        <div class="r-description">
          <div class="table-tool">
            <div class="btn-container">
              <el-button v-if="state.checkData.categotyId" v-permission="['product.category.update']" class="btn-item" type="primary" :icon="Edit" @click="mUpdate">编辑</el-button>
              <el-button v-permission="['product.category.create']" class="btn-item" type="primary" :icon="Edit" @click="mCreate">添加下级</el-button>
              <TreeDialog v-if="state.checkData.categotyId" v-permission="['product.category.update']" ref="categoryDialogRef" button btn-text="移动" :btn-icon="Rank" radio title="商品分类" 
                :load-params="state.checkData.categotyId" :load="getCategoryExcludeTreeList"  @confirm="mMove">
              </TreeDialog>
              <el-button v-if="state.checkData.categotyId" v-permission="['product.category.del']" class="btn-item" type="danger" :icon="Delete" @click="mDel">删除</el-button>
            </div>
          </div>
          <el-descriptions title="" :column="2" border>
            <el-descriptions-item label="上级分类" span="2">{{ state.modelData.parentName }}</el-descriptions-item>
            <el-descriptions-item label="分类编号">{{ state.modelData.categoryCode }}</el-descriptions-item>
            <el-descriptions-item label="分类名称">{{ state.modelData.categoryName }}</el-descriptions-item>
            <el-descriptions-item label="排序号">{{ state.modelData.sortNo }}</el-descriptions-item>
            <el-descriptions-item label="描述">{{ state.modelData.description }}</el-descriptions-item>
          </el-descriptions> 
        </div>
        <div class="r-table">
          <ConstTable ref="categoryTbRef" :data="state.modelData.categoryItems">
            <el-table-column label="分类编号" prop="categoryCode" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="分类名称" prop="categoryName" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="排序号" prop="sortNo" width="120" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="描述" prop="description" min-width="200" header-align="center" align="left" show-overflow-tooltip />
            <el-table-column label="状态" prop="status" width="80" align="center" fixed="right">
              <template #default="{ row }">
                <el-tag :type="row.status ? 'success' : 'danger'" size="small" effect="light">
                  {{ useValueToLabel(commonStatus, row.status) }}
                </el-tag>
              </template>
            </el-table-column>
          </ConstTable>
        </div>
      </div>
    </div>
    <ConstDialog ref="editDialogRef" :title="'添加商品分类'" :btns="['save']" @save="mSave">
      <CategoryEdit ref="categoryEditRef" :params="state.editParams"></CategoryEdit>
    </ConstDialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Edit, Rank, Delete } from '@element-plus/icons-vue'
import { TreeData } from 'element-plus/es/components/tree/src/tree.type'; 
import { useConfirm, useConfirmDel, useMessageSuccess } from '@/hooks/web/message'
import { useDict, useValueToLabel } from '@/hooks/event/dict'
import { Tree, TreeItem } from '@/models/common/treeModel'
import { Response } from '@/models/response'
import { Category } from '@/models/product/categoryModel'

import { getCategoryTreeList, getCategoryExcludeTreeList, getCategory, moveCategory, delCategory } from '@/apis/product/category'
import TreeDialog from '@/components/ConstDialog/TreeDialog/index.vue'
import CategoryEdit from './edit.vue'

defineOptions({
  name: 'ProductCategory'
})

const { commonStatus } = useDict()
const state = reactive({
  treeData: [] as Tree,
  modelData: {} as Category,
  checkData: {
    categotyId: '',
    categoryName: ''
  },
  editParams: {
    id: '',
    parentId: '',
    parentName: ''
  }
})
const categoryTbRef = ref<ConstTable>()
const editDialogRef = ref<ConstDialog>()
const categoryEditRef = ref<ComponentRef>()
const categoryDialogRef = ref<ConstDialog>()

onMounted(() => {
  getTreeData()
})

let expandKeys = ref<string[]>([])
const getTreeData = () => {
  getCategoryTreeList().then((res: Response<Tree>) => {
    state.treeData = res.data;
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

const mUpdate = () => {
  state.editParams.id = state.checkData.categotyId
  state.editParams.parentId = ''
  state.editParams.parentName = ''
  editDialogRef.value?.open()
}

const mCreate = () => {
  state.editParams.id = ''
  state.editParams.parentId = state.checkData.categotyId
  state.editParams.parentName = state.checkData.categoryName
  editDialogRef.value?.open()
}

const mMove = (data: TreeData) => {
  useConfirm({ message: '确定移动至该分类下吗?', type: 'warning' }).then(() => {
    moveCategory(state.checkData.categotyId, data[0].id).then((res: Response<any>) => {
      getTreeData();
      useMessageSuccess(res.msg)
      categoryDialogRef.value?.close()
    })
  })
}

const mSave = async () => {
  categoryEditRef.value?.save().then((res: any) => {
    getTreeData();
    editDialogRef.value?.close();
  })
}

const mDel = () => {
  useConfirmDel().then(() => {
    delCategory(state.checkData.categotyId).then((res: Response<any>) => {
      useMessageSuccess(res.msg)
      getTreeData();
    })
  })
}
</script>