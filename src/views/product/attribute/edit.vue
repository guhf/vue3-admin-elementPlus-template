<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.attribute.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="规格名称:" prop="attributeName">
            <el-input v-model="state.modelData.attributeName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格编号:" prop="attributeCode">
            <el-input v-model="state.modelData.attributeCode" type="text" disabled placeholder="系统自动生成" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
      <el-row>
        <DynamicTable ref="contractNodeRef" v-model="state.modelData.attributeItems" title="规格属性">
          <el-table-column label="规格属性名称" prop="name" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attributeItems.' + $index + '.name'" :rules="state.attributeItemRules.name">
                <el-input v-model="row.name" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格属性名称" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="规格属性值" prop="value" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attributeItems.' + $index + '.value'" :rules="state.attributeItemRules.value">
                <el-input v-model="row.value" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格属性键值" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序号" prop="sortNo" width="150" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attributeItems.' + $index + '.sortNo'">
                <el-input v-model.number="row.sortNo" type="text" clearable placeholder="请输入排序号" />
              </el-form-item>
            </template>
          </el-table-column>
        </DynamicTable>
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
import type { Attribute } from '~/models/product/attributeModel'
import { useRouterBackIndex, useValidate } from '~/hooks'

import { createAttribute, getAttribute, updateAttribute } from '~/apis/product/attribute'

defineOptions({
  name: 'ProductAttributeEdit',
})

const state = reactive({
  id: '',
  modelData: {
    status: true,
  } as Attribute,
  modelRules: {
    attributeName: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
  },
  attributeItemRules: {
    name: [{ required: true, message: '请输入规格属性名称', trigger: 'blur' }],
    value: [{ required: true, message: '请输入规格属性键值', trigger: 'blur' }],
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
  getAttribute(state.id).then((res: Response<Attribute>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateAttribute(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createAttribute(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>
