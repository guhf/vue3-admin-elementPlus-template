<template>
  <div class="app-main-wrapper">
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级分类:" prop="parentName">
            <el-input v-model="state.modelData.parentName" type="text" disabled placeholder="请选择上级分类" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类编号:" prop="categoryCode">
            <el-input v-model="state.modelData.categoryCode" type="text" maxlength="50" show-word-limit clearable placeholder="请输入分类编号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类名称:" prop="categoryName">
            <el-input v-model="state.modelData.categoryName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入分类名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分类图片:" prop="categoryImg">
            <UploadImage v-model="state.modelData.categoryImg" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序号:" prop="sortNo">
            <el-input v-model="state.modelData.sortNo" type="text" maxlength="50" show-word-limit clearable placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row />
      <el-row>
        <el-col :span="24">
          <el-form-item label="描述:" prop="description">
            <el-input v-model="state.modelData.description" type="textarea" maxlength="200" show-word-limit clearable placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="附件:" prop="attrs">
            <ConstUpload ref="attrsRef" v-model="state.modelData.attrs" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import type { Response } from '~/models/response'
import type { Category } from '~/models/product/categoryModel'
import { useMessageSuccess, useValidate } from '~/hooks'
import UploadImage from '~/components/upload/UploadImage.vue'

import { createCategory, getCategory, updateCategory } from '~/apis/product/category'

defineOptions({
  name: 'ProductCategoryEdit',
})

const props = defineProps<{
  params: {
    id: string
    parentId: string
    parentName: string
  }
}>()

const state = reactive({
  id: '',
  modelData: {} as Category,
  modelRules: {
    categoryName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
  },
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  state.modelData.parentId = props.params.parentId || undefined
  state.modelData.parentName = props.params.parentName || undefined
  getData()
})

const getData = () => {
  if (!props.params.id) return
  getCategory(props.params.id).then((res: Response<Category>) => {
    if (res.data) {
      state.modelData = res.data
    }
  })
}

const save = async () => {
  return new Promise(async (resolve, reject) => {
    if (!(await useValidate(modelRef.value))) return

    if (props.params.id) {
      updateCategory(state.modelData)
        .then((res: Response<any>) => {
          useMessageSuccess(res.msg)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    } else {
      createCategory(state.modelData)
        .then((res: Response<any>) => {
          useMessageSuccess(res.msg)
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}

defineExpose({
  save,
})
</script>
