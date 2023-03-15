<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.label.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="标签名称:" prop="labelName">
            <el-input v-model="state.modelData.labelName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入标签名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标签编号:" prop="labelCode">
            <el-input v-model="state.modelData.labelCode" type="text" disabled placeholder="系统自动生成" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="排序号:" prop="sortNo">
            <el-input v-model="state.modelData.sortNo" type="text" maxlength="50" show-word-limit clearable placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态:" prop="status">
            <el-switch v-model="state.modelData.status" size="large" inline-prompt width="60px" active-text="启用" inactive-text="禁用" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="state.modelData.description" type="textarea" maxlength="200" show-word-limit clearable placeholder="请输入备注" />
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
import { Label } from '@/models/product/labelModel'

import { getLabel, createLabel, updateLabel } from '@/apis/product/label'

defineOptions({
  name: 'ProductLabelEdit'
})

const state = reactive({
  id: '',
  modelData: {
    status: true
  } as Label,
  modelRules: {
    labelName: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
  }
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
  getLabel(state.id).then((res: Response<Label>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateLabel(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createLabel(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>