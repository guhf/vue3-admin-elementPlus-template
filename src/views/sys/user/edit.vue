<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.user.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名称:" prop="userName">
            <el-input v-model="state.modelData.userName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入用户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户编号:" prop="userCode">
            <el-input v-model="state.modelData.userCode" type="text" disabled placeholder="系统自动生成" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号名称:" prop="accountName">
            <el-input v-model="state.modelData.accountName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入账号名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色:" prop="roleIds">
            <el-select v-if="state.showRoleSelect" v-model="state.modelData.roleIds" multiple filterable clearable placeholder="请选择角色" @change="modelRef?.validateField('roleIds')">
              <el-option v-for="item in state.roleData" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期:" prop="birthday">
            <el-date-picker v-model="state.modelData.birthday" type="date" :editable="false" placeholder="选择出生日期" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="state.modelData.sex">
              <el-radio-button v-for="sex in commonSex" :label="Number(sex.value)" :key="sex.value">{{ sex.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码:" prop="phone">
            <el-input v-model="state.modelData.phone" type="text" maxlength="11" show-word-limit clearable placeholder="请输入手机号码" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="省市区:" prop="accountName">
            <el-input type="text" v-model="modelData.accountName" clearable placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import { Checked, CircleClose } from '@element-plus/icons-vue'
import { useRouterBackIndex } from '@/hooks/web/router'
import { useValidate } from '@/hooks/event/validate'
import { useDict } from '@/hooks/event/dict'
import { Response } from '@/models/response'
import { User, UserRole } from '@/models/sys/userModel'
import { Options } from '@/models/common/optionModel'

import { getUser, createUser, updateUser } from '@/apis/sys/user'
import { getRoleSelectList } from '@/apis/sys/role'

defineOptions({
  name: 'SysUserEdit'
})

const { commonSex } = useDict()
const state = reactive({
  id: '',
  modelData: {
    roleIds: [] as string[],
    sex: 1,
  } as User,
  roleData: [] as Options,
  showRoleSelect: false,
  userDialogVisible: false,
  modelRules: {
    userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
    accountName: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
    roleIds: [{ required: true, message: '请选择用户角色', trigger: 'blur' }],
  },
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
  getRoleData()
})

const getData = () => {
  getUser(state.id).then((res: Response<User>) => {
    if (res.data) {
      state.modelData = res.data

      state.modelData.roleIds = [];
      (state.modelData.userRoles || []).forEach((userRole: UserRole) => {
        state.modelData.roleIds.push(userRole.roleId)
      })
    }
  })
}

const getRoleData = () => {
  getRoleSelectList().then((res: Response<Options>) => {
    if (res.data) {
      state.roleData = res.data
      state.showRoleSelect = true
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateUser(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createUser(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>