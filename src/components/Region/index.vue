<template>
  <el-col :span="8">
    <el-select v-model="stateData.provinceId" :size="size" :clearable="clearable" filterable placeholder="请选择省份" @change="provinceChange">
      <el-option v-for="item in stateData.provinceData" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
  </el-col>
  <el-col :span="8">
    <el-select v-model="stateData.cityId" :size="size" :clearable="clearable" filterable placeholder="请选择城市" @change="cityChange">
      <el-option v-for="item in stateData.cityData" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
  </el-col>
  <el-col :span="8">
    <el-select v-model="stateData.countyId" :size="size" :clearable="clearable" filterable placeholder="请选择区/县" @change="countyChange">
      <el-option v-for="item in stateData.countyData" :key="item.value" :label="item.label" :value="Number(item.value)" />
    </el-select>
  </el-col>
</template>

<script lang="ts" setup>
import { reactive, onMounted, watch } from 'vue'

import { getProvinceList, getCityList, getDistrictList } from '~/apis/common/district'
import { ComponentSize } from 'element-plus/es/constants'

interface Props {
  provinceId?: any
  cityId?: any
  countyId?: any
  size?: ComponentSize
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  provinceId: '',
  cityId: '',
  countyId: '',
  size: 'default',
  clearable: false
})

const emits = defineEmits<{(e: 'provinceChange', val: number): void
    (e: 'cityChange', val: number): void
    (e: 'countyChange', val: number): void
  }>()

const stateData = reactive({
  provinceData: [] as any[],
  cityData: [] as any[],
  countyData: [] as any[],
  provinceId: '',
  cityId: '',
  countyId: ''
})

watch(() => props.provinceId, () => {
  stateData.provinceId = props.provinceId
})

watch(() => props.cityId, () => {
  stateData.cityId = props.cityId
  if (props.cityId > 0) {
    getCityData(Number(stateData.provinceId))
  }
})

watch(() => props.countyId, () => {
  stateData.countyId = props.countyId
  if (props.countyId > 0) {
    getDistrictData(Number(stateData.cityId))
  }
})

onMounted(() => {
  getProvinceData()
  stateData.provinceId = props.provinceId
  stateData.cityId = props.cityId
  stateData.countyId = props.countyId
})

const getProvinceData = () => {
  getProvinceList().then((res: any) => {
    stateData.provinceData = res.stateData
  })
}

const getCityData = (id: number) => {
  if (!id) return
  getCityList(id).then((res: any) => {
    stateData.cityData = res.stateData
  })
}

const getDistrictData = (id: number) => {
  if (!id) return
  getDistrictList(id).then((res: any) => {
    stateData.countyData = res.stateData
  })
}

const provinceChange = (val: number) => {
  getCityData(val)
  stateData.countyData = []
  emits('provinceChange', val)
}

const cityChange = (val: number) => {
  getDistrictData(val)
  emits('cityChange', val)
}

const countyChange = (val: number) => {
  emits('countyChange', val)
}

defineExpose({
})
</script>

<style lang="scss" scoped>
</style>
