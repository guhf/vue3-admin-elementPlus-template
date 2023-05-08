<template>
  <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="旧密码:" prop="oldPwd">
          <el-input v-model="state.modelData.oldPwd" type="password" minlength="6" maxlength="20" show-word-limit clearable placeholder="请输入旧密码" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="新密码:" prop="pwd">
          <el-input v-model="state.modelData.pwd" type="password" minlength="6" maxlength="20" show-word-limit clearable placeholder="请输入新密码" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="确认新密码:" prop="checkPwd">
          <el-input v-model="state.modelData.checkPwd" type="password" minlength="6" maxlength="20" show-word-limit clearable placeholder="请输入新密码" />
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
import { reactive, ref } from 'vue'
import { useMessageSuccess, useValidate } from '~/hooks'
import { Response } from '~/models/response'
import { FormInstance } from 'element-plus'
import { Checked } from '@element-plus/icons-vue'

import { updatePwd } from '~/apis/user'

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入新密码'))
  } else {
    if (state.modelData.checkPwd !== '') {
      if (!modelRef.value) return
      modelRef.value.validateField('checkPwd')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入新密码'))
  } else if (state.modelData.pwd !== '' && value !== state.modelData.pwd) {
    callback(new Error('两次输入密码不一致！'))
  } else {
    callback()
  }
}

const state = reactive({
  id: 0,
  modelData: {
    id: 0,
    oldPwd: '',
    pwd: '',
    checkPwd: ''
  },
  modelRules: {
    oldPwd: [
      { required: true, message: '请输入旧密码', trigger: 'blur' }
    ],
    pwd: [
      { validator: validatePass, trigger: 'blur' }
    ],
    checkPwd: [
      { validator: validatePass2, trigger: 'blur' }
    ]
  }
})
const modelRef = ref<FormInstance>()

const mSave = async () => {
  if (!await useValidate(modelRef.value)) return

  const pwdData = {
    oldPwd: state.modelData.oldPwd,
    pwd: state.modelData.pwd
  }

  updatePwd(pwdData).then((res: Response<object>) => {
    useMessageSuccess(res.msg)
  })
}

</script>

<style scoped>
</style>
