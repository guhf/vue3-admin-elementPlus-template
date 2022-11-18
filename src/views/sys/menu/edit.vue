<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.menu.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单名称:" prop="menuName">
            <el-input v-model="state.modelData.menuName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入菜单名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上级菜单:" prop="parentId">
            <el-tree-select v-model="state.modelData.parentId" :data="state.menuTreeData" clearable filterable check-strictly render-after-expand :props="{ value: 'id', label: 'menuName', children: 'children' }" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单标识:" prop="menuCode">
            <el-input v-model="state.modelData.menuCode" type="text" maxlength="100" show-word-limit clearable placeholder="请输入菜单标识" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="权限标识:" prop="authority">
            <el-input v-model="state.modelData.authority" type="text" maxlength="50" show-word-limit clearable placeholder="请输入权限标识" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单类型:" prop="menuType">
            <el-radio-group v-model="state.modelData.menuType">
              <el-radio-button v-for="item in state.menuTypes" :key="item.value" :label="Number(item.value)">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单图标:" prop="icon">
            <icon-selector v-model="state.modelData.icon" :icon-type="state.modelData.menuType" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="菜单路由:" prop="path">
            <el-input v-model="state.modelData.path" type="text" maxlength="200" show-word-limit clearable placeholder="请输入菜单路由" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单地址:" prop="component">
            <el-input v-model="state.modelData.component" type="text" maxlength="200" show-word-limit clearable placeholder="请输入菜单文件地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="接口地址:" prop="url">
            <el-input v-model="state.modelData.apiUrl" type="text" maxlength="200" show-word-limit clearable placeholder="请输入接口地址" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序号:" prop="sortNo">
            <el-input v-model="state.modelData.sortNo" type="number" oninput="if(value.length > 5) value = value.slice(0, 5)" clearable placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import { Checked, CircleClose } from '@element-plus/icons-vue'
import IconSelector from '@/components/IconSelector/index.vue'
import { useRouterBackIndex } from '@/hooks/web/router'
import { useValidate } from '@/hooks/event/validate'
import { Response } from '@/models/response'
import { MenuTree, Menu } from '@/models/sys/menuModel'
import { SelectOptions } from '@/models/common/selectModel'

import { getMenu, getMenuTreeList, createMenu, updateMenu } from '@/apis/sys/menu'

defineOptions({
  name: 'SysMenuEdit'
})

const state = reactive({
  id: '',
  modelData: {
    menuType: 1,
  } as Menu,
  menuTypes: [] as SelectOptions,
  menuTreeData: [] as MenuTree,
  showMenuSelect: false,
  modelRules: {
    menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
    menuCode: [{ required: true, message: '请输入菜单标识', trigger: 'blur' }],
  },
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
  getMenuTreeData()
})

const getData = () => {
  getMenu(state.id).then((res: Response<Menu>) => {
    if (res.data != null) {
      state.modelData = res.data
    }
    state.menuTypes = res.enums.menuType
  })
}

const getMenuTreeData = () => {
  getMenuTreeList(1).then((res: Response<MenuTree>) => {
    if (res.data != null) {
      state.menuTreeData = res.data
      state.showMenuSelect = true
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateMenu(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createMenu(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>