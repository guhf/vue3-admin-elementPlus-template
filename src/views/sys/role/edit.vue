<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.role.create', 'sys.role.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
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
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import { Checked, CircleClose } from '@element-plus/icons-vue'
import { useRouterBackIndex, useValidate } from '@/hooks'
import { Response } from '@/models/response'
import { Role } from '@/models/sys/roleModel'

import { getRole, createRole, updateRole } from '@/apis/sys/role'

defineOptions({
  name: 'SysRoleEdit'
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

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

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