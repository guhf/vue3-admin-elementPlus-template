<template>
  <div class="app-main-wrapper">
    <div class="btn-container">
      <el-button v-permission="['product.attrtemplate.update']" type="primary" :icon="Checked" @click="handleSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="规格模板名称:" prop="attrTemplateName">
            <el-input v-model="state.modelData.attrTemplateName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格模板名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格模板编号:" prop="attrTemplateCode">
            <el-input v-model="state.modelData.attrTemplateCode" type="text" disabled placeholder="系统自动生成" />
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
        <DynamicTable ref="contractNodeRef" v-model="state.modelData.attrTemplateItems" title="规格模板明细">
          <el-table-column label="规格名称" prop="attributeName" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attrTemplateItems.' + $index + '.attributeName'" :rules="state.attrTemplateItemRules.attributeName">
                <el-input v-model="row.attributeName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格名称" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="规格编号" prop="attributeCode" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attrTemplateItems.' + $index + '.attributeCode'" :rules="state.attrTemplateItemRules.attributeCode">
                <el-input v-model="row.attributeCode" type="text" maxlength="50" show-word-limit clearable placeholder="请输入规格编号" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序号" prop="sortNo" width="150" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'attrTemplateItems.' + $index + '.sortNo'">
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
import type { AttrTemplate } from '~/models/product/attrTemplateModel'
import { useRouterBackIndex, useValidateForm } from '~/hooks'

import { createAttrTemplate, getAttrTemplate, updateAttrTemplate } from '~/apis/product/attrTemplate'

defineOptions({
  name: 'ProductAttrTemplateEdit',
})

const state = reactive({
  id: '',
  modelData: {
    status: true,
  } as AttrTemplate,
  modelRules: {
    attrTemplateName: [{ required: true, message: '请输入规格模板名称', trigger: 'blur' }],
  },
  attrTemplateItemRules: {
    attributeName: [{ required: true, message: '请选择规格名称', trigger: 'blur' }],
    attributeCode: [{ required: true, message: '请输入规格编号', trigger: 'blur' }],
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
  getAttrTemplate(state.id).then((res: Response<AttrTemplate>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const handleSave = async () => {
  if (!(await useValidateForm(modelRef.value))) return

  if (state.id) {
    updateAttrTemplate(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createAttrTemplate(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>
