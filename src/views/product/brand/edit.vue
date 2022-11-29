<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['product.brand.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌名称:" prop="brandName">
            <el-input v-model="state.modelData.brandName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入品牌名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌编号:" prop="brandCode">
            <el-input v-model="state.modelData.brandCode" type="text" maxlength="50" show-word-limit clearable placeholder="请输入品牌编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌类型:" prop="brandType">
            <el-radio-group v-model="state.modelData.brandType">
              <el-radio-button v-for="item in productBrandType" :key="item.value" :label="Number(item.value)">{{ item.label }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="排序号:" prop="sortNo">
            <el-input v-model="state.modelData.sortNo" type="text" maxlength="50" show-word-limit clearable placeholder="请输入排序号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="remark">
            <el-input v-model="state.modelData.remark" type="textarea" maxlength="200" show-word-limit clearable placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <DynamicTable ref="contractNodeRef" v-model="state.modelData.brandItems" title="品牌明细">
          <el-table-column label="品牌明细名称" prop="brandItemName" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'brandItems.' + $index + '.brandItemName'" :rules="state.brandItemRules.brandItemName">
                <el-input type="text" v-model="row.brandItemName" maxlength="50" show-word-limit clearable placeholder="请输入品牌明细名称"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="品牌明细键值" prop="brandItemValue" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'brandItems.' + $index + '.brandItemValue'" :rules="state.brandItemRules.brandItemValue">
                <el-input type="text" v-model="row.brandItemValue" maxlength="50" show-word-limit clearable placeholder="请输入品牌明细键值"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序号" prop="sortNo" width="150" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'brandItems.' + $index + '.sortNo'">
                <el-input type="text" v-model.number="row.sortNo" clearable placeholder="请输入排序号"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" min-width="360" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'brandItems.' + $index + '.remark'">
                <el-input type="text" v-model="row.remark" maxlength="50" clearable placeholder="请输入备注"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
        </DynamicTable>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { FormInstance } from 'element-plus'
import { Checked, CircleClose } from '@element-plus/icons-vue'
import { useRouterBackIndex } from '@/hooks/web/router'
import { useBrand } from '@/hooks/event/brand'
import { useValidate } from '@/hooks/event/validate'
import { Response } from '@/models/response'
import { Brand } from '@/models/product/brandModel'

import { getBrand, createBrand, updateBrand } from '@/apis/product/brand'

defineOptions({
  name: 'ProductBrandEdit'
})

const { productBrandType } = useBrand()
const state = reactive({
  id: '',
  modelData: {
    brandType: 2
  } as Brand,
  showRoleSelect: false,
  brandDialogVisible: false,
  modelRules: {
    brandName: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }],
    brandCode: [{ required: true, message: '请输入品牌编号', trigger: 'blur' }],
    brandType: [{ required: true, message: '请选择品牌类型', trigger: 'blur' }],
  },
  brandItemRules: {
    brandItemName: [{ required: true, message: '请输入品牌明细名称', trigger: 'blur' }],
    brandItemValue: [{ required: true, message: '请输入品牌明细键值', trigger: 'blur' }],
  }
})
const modelRef = ref<FormInstance>()

onMounted(() => {
  const { params } = useRoute()
  const id = params.id as string
  if (params.id) state.id = id

  getData()
})

const getData = () => {
  getBrand(state.id).then((res: Response<Brand>) => {
    if (res.data != null) {
      state.modelData = res.data
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateBrand(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createBrand(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>