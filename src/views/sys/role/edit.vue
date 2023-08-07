<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['sys.role.create', 'sys.role.update']" type="primary" :icon="Checked" @click="handleSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色名称:" prop="roleName">
            <el-input v-model="state.modelData.roleName" type="text" maxlength="200" clearable placeholder="请输入角色名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色标识:" prop="roleCode">
            <el-input v-model="state.modelData.roleCode" type="text" maxlength="200" show-word-limit clearable placeholder="请输入角色标识" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="state.modelData.description" type="textarea" rows="6" maxlength="2000" show-word-limit clearable placeholder="请输入描述" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Checked, CircleClose } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import type { Response } from '~/models/response'
import type { Role } from '~/models/sys/roleModel'
import { useRouterBackIndex, useValidateForm } from '~/hooks'

import { createRole, getRole, updateRole } from '~/apis/sys/role'

defineOptions({
  name: 'SysRoleEdit',
})

const state = reactive({
  id: '',
  modelData: {} as Role,
  roleDialogVisible: false,
  modelRules: {
    roleName: [
      { required: true, message: '请输入角色名称', trigger: 'blur' },
      { min: 1, max: 200, message: '角色名称长度范围在1-200之间' },
    ],
    roleCode: [
      { required: true, message: '请输入角色标识', trigger: 'blur' },
      { min: 1, max: 200, message: '角色标识长度范围在1-200之间' },
    ],
  },
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  const { params } = useRoute()
  if (params.id) {
    state.id = params.id as string
    getData()
  }
})

const getData = () => {
  getRole(state.id).then((res: Response<Role>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleSave = async () => {
  if (!(await useValidateForm(modelRef.value))) return

  if (state.id) {
    updateRole(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createRole(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>
