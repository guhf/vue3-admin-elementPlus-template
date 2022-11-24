<template>
  <div class="app-container">
    <div class="btn-container">
      <el-button v-permission="['sys.dict.update']" type="primary" :icon="Checked" @click="mSave">保存</el-button>
      <el-button :icon="CircleClose" @click="useRouterBackIndex()">关闭</el-button>
    </div>
    <el-form ref="modelRef" :model="state.modelData" :rules="state.modelRules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="字典名称:" prop="dictName">
            <el-input v-model="state.modelData.dictName" type="text" maxlength="50" show-word-limit clearable placeholder="请输入字典名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字典编号:" prop="dictCode">
            <el-input v-model="state.modelData.dictCode" type="text" maxlength="50" show-word-limit clearable placeholder="请输入字典编号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="字典类型:" prop="dictType">
            <el-radio-group v-model="state.modelData.dictType">
              <el-radio-button v-for="item in sysDictType" :key="item.value" :label="Number(item.value)">{{ item.label }}</el-radio-button>
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
        <DynamicTable ref="contractNodeRef" v-model="state.modelData.dictItems" title="字典明细">
          <el-table-column label="字典明细名称" prop="dictItemName" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'dictItems.' + $index + '.dictItemName'" :rules="state.dictItemRules.dictItemName">
                <el-input type="text" v-model="row.dictItemName" maxlength="50" show-word-limit clearable placeholder="请输入字典明细名称"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="字典明细键值" prop="dictItemValue" min-width="200" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'dictItems.' + $index + '.dictItemValue'" :rules="state.dictItemRules.dictItemValue">
                <el-input type="text" v-model="row.dictItemValue" maxlength="50" show-word-limit clearable placeholder="请输入字典明细键值"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="排序号" prop="sortNo" width="150" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'dictItems.' + $index + '.sortNo'">
                <el-input type="text" v-model.number="row.sortNo" clearable placeholder="请输入排序号"></el-input>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark" min-width="360" align="center">
            <template #default="{ row, $index }">
              <el-form-item :prop="'dictItems.' + $index + '.remark'">
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
import { useDict } from '@/hooks/event/dict'
import { useValidate } from '@/hooks/event/validate'
import { Response } from '@/models/response'
import { Dict } from '@/models/sys/dictModel'

import { getDict, createDict, updateDict } from '@/apis/sys/dict'

defineOptions({
  name: 'SysDictEdit'
})

const { sysDictType } = useDict()
const state = reactive({
  id: '',
  modelData: {
    dictType: 2
  } as Dict,
  showRoleSelect: false,
  dictDialogVisible: false,
  modelRules: {
    dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
    dictCode: [{ required: true, message: '请输入字典编号', trigger: 'blur' }],
    dictType: [{ required: true, message: '请选择字典类型', trigger: 'blur' }],
  },
  dictItemRules: {
    dictItemName: [{ required: true, message: '请输入字典明细名称', trigger: 'blur' }],
    dictItemValue: [{ required: true, message: '请输入字典明细键值', trigger: 'blur' }],
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
  getDict(state.id).then((res: Response<Dict>) => {
    if (res.data != null) {
      state.modelData = res.data
    }
  })
}

const mSave = async () => {
  if (!(await useValidate(modelRef.value))) return

  if (state.id) {
    updateDict(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  } else {
    createDict(state.modelData).then((res: Response<any>) => {
      useRouterBackIndex({ msg: res.msg })
    })
  }
}
</script>