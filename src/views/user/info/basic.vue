<template>
  <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户编号:">{{ state.modelData.userCode }}</el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="角色:">
          <el-tag v-for="(role, index) in state.modelData.userRoles" :key="index" size="small" effect="light">{{ role.roleName }}</el-tag>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="账号名称:" prop="accountName">
          <el-input v-model="state.modelData.accountName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入账号名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="用户名称:" prop="userName">
          <el-input v-model="state.modelData.userName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入用户名称" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="出生日期:" prop="birthday">
          <el-date-picker v-model="state.modelData.birthday" type="date" value-format="YYYY-MM-DD" :editable="false" placeholder="选择出生日期" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="性别:" prop="sex">
          <el-radio-group v-model="state.modelData.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
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
    <el-row>
      <el-col>
        <el-form-item label="">
          <el-button type="primary" size="small" :icon="Checked" @click="mSave">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { Checked } from '@element-plus/icons-vue'
import { useMessageSuccess, useValidate } from '~/hooks'

import { getOnlineInfo, updateInfo } from '~/apis/user'
import { UserInfo } from '~/models/userModel'
import { Response } from '~/models/response'
import { FormInstance } from 'element-plus'

const state = reactive({
  id: 0,
  modelData: {
    sex: 1,
  } as UserInfo,
  modelRules: {
    accountName: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
    userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
  },
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  getPageData()
})

const getPageData = () => {
  getOnlineInfo().then((res: Response<UserInfo>) => {
    state.modelData = res.data
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  updateInfo(state.modelData).then((res: Response<object>) => {
    useMessageSuccess(res.msg)
  })
}
</script>

<style scoped></style>
