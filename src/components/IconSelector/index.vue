<template>
  <el-input v-model="modelValue" type="text" class="icon-input" :placeholder="placeholder" readonly prefix-icon="">
    <template #prefix>
      <SvgIcon :icon-name="modelValue" />
    </template>
    <template #append>
      <el-button :icon="Search" @click="openIconPopup" />
    </template>
  </el-input>

  <ConstDialog ref="selectIconDialogRef" title="选择图标" :btns="['check']" @check="checkIcon">
    <ConstFilter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>图标名称</label>
        <el-input v-model="state.pageQuery.iconName" type="text" clearable placeholder="请输入图标名称/代码" @keyup.enter="filterData" />
      </div>
    </ConstFilter>
    <ul class="icon-list">
      <li v-for="item in state.iconData" :key="item.icon_id" class="icon-item" @click="iconClick(item)">
        <span class="icon-wapper" :style="{'color': state.checkIcon.icon_id === item.icon_id ? variables.theme : '#666666'}">
          <SvgIcon :icon-name="state.iconPrefix + item.font_class" class="icon" :color="state.checkIcon.icon_id === item.icon_id ? variables.theme : '#666666'" />
          <i :class="state.iconPrefix + item.font_class" />
          <span class="icon-code" :title="state.iconPrefix + item.font_class">{{ state.iconPrefix + item.font_class }}</span>
          <span class="icon-name" :title="item.name">{{ item.name }}</span>
        </span></li>
    </ul>
  </ConstDialog>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import variables from '@/styles/variables.module.scss'
import { Search } from '@element-plus/icons-vue'
import { getMenuIcons, getOperateIcons } from '@/apis/common/icon'
import { IconModel, Glyphs } from '@/models/common/iconModel'

interface Props{
  modelValue: string | number | null
  iconType: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  iconType: 1,
  placeholder: '请选择图标'
})
// const value = computed(() => props.modelValue)

const emits = defineEmits<{(e: 'update:modelValue', newValue: string): void}>()

const state = reactive({
  pageQuery: {
    iconName: '' as string
  },
  icons: [] as Glyphs[],
  iconData: [] as Glyphs[],
  iconPrefix: '' as string,
  checkIcon: {} as Glyphs
})

const selectIconDialogRef = ref<ConstDialog>()

onMounted(() => {
  if (props.iconType === 1) {
    getMenuIcons().then((res: IconModel) => {
      state.icons = res.glyphs
      state.iconPrefix = res.css_prefix_text || ''
      state.iconData = res.glyphs
    })
  } else if (props.iconType === 2) {
    getOperateIcons().then((res: IconModel) => {
      state.icons = res.glyphs
      state.iconPrefix = res.css_prefix_text || ''
      state.iconData = res.glyphs
    })
  }
})

const openIconPopup = () => {
  console.log(props.iconType)

  selectIconDialogRef.value?.open()
}

const filterData = () => {
  state.checkIcon = {
    icon_id: '',
    name: '',
    font_class: ''
  }
  nextTick(() => {
    state.iconData = state.icons.filter((item: Glyphs) => {
      return item.name.indexOf(state.pageQuery.iconName) > -1 || item.font_class.indexOf(state.pageQuery.iconName) > -1
    })
  })
}

const resetData = () => {
  state.checkIcon = {
    icon_id: '',
    name: '',
    font_class: ''
  }
  state.pageQuery.iconName = ''
  state.iconData = state.icons
}

const iconClick = (glyphs: Glyphs) => {
  state.checkIcon = glyphs
}

const checkIcon = () => {
  emits('update:modelValue', state.iconPrefix + state.checkIcon.font_class)
  selectIconDialogRef.value?.close()
}
</script>

<style lang="scss" scoped>
.icon-input{
  .SvgIcon{
    width: 1rem;
    height: 1rem;
  }
}

.icon-list{
  overflow: auto;
  list-style: none;
  padding: 0!important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5,1fr);

  .icon-item{
    text-align: center;
    color: var(--el-text-color-regular);
    height: 150px;
    font-size: 13px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);

    .icon-wapper{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      .icon-code, .icon-name{
        max-width: 100px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
