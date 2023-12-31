<template>
  <el-input v-model="iconName" type="text" class="icon-input" :placeholder="placeholder" readonly prefix-icon="">
    <template #prefix>
      <SvgIcon :icon-name="iconName" />
    </template>
    <template #append>
      <el-button :icon="Search" @click="openIconPopup" />
    </template>
  </el-input>

  <CommonDialog ref="selectIconDialogRef" v-model="state.iconDialogVisible" title="选择图标" :btns="['check']" @check="checkIcon">
    <Filter @search="filterData" @reset="resetData">
      <div class="filter-item">
        <label>图标名称</label>
        <el-input v-model="state.pageQuery.iconName" type="text" clearable placeholder="请输入图标名称/代码" @keyup.enter="filterData" />
      </div>
    </Filter>
    <ul class="icon-list">
      <li v-for="item in state.iconData" :key="item.icon_id" class="icon-item" @click="iconClick(item)">
        <span class="icon-wapper" :style="{ color: state.checkIcon.icon_id === item.icon_id ? variables.theme : '#666666' }">
          <SvgIcon :icon-name="state.iconPrefix + item.font_class" class="icon" :color="state.checkIcon.icon_id === item.icon_id ? variables.theme : '#666666'" />
          <i :class="state.iconPrefix + item.font_class" />
          <span class="icon-code" :title="state.iconPrefix + item.font_class">{{ state.iconPrefix + item.font_class }}</span>
          <span class="icon-name" :title="item.name">{{ item.name }}</span>
        </span></li
      >
    </ul>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { Glyphs, IconModel } from '~/models/common/iconModel'
import { getMenuIcons, getOperateIcons } from '~/apis/common/icon'
import variables from '~/styles/variables.module.scss'

interface Props {
  modelValue: string | null
  iconType: number
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  iconType: 1,
  placeholder: '请选择图标',
})

const emits = defineEmits<{ (e: 'update:modelValue', newValue: string): void }>()

const state = reactive({
  pageQuery: {
    iconName: '' as string,
  },
  icons: [] as Glyphs[],
  iconData: [] as Glyphs[],
  iconPrefix: '' as string,
  checkIcon: {} as Glyphs,
  iconDialogVisible: false,
})

const iconName = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value || '')
  },
})

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
  let selectedIcon = state.iconData.find((icon) => {
    return icon.font_class === (props.modelValue ? String(props.modelValue).replace(state.iconPrefix, '') : '')
  })
  state.checkIcon = selectedIcon || ({} as Glyphs)

  state.iconDialogVisible = true
}

const filterData = () => {
  state.checkIcon = {} as Glyphs

  nextTick(() => {
    state.iconData = state.icons.filter((item: Glyphs) => {
      return item.name.includes(state.pageQuery.iconName) || item.font_class.includes(state.pageQuery.iconName)
    })
  })
}

const resetData = () => {
  state.checkIcon = {} as Glyphs

  state.pageQuery.iconName = ''
  state.iconData = state.icons
}

const iconClick = (glyphs: Glyphs) => {
  state.checkIcon = glyphs
}

const checkIcon = () => {
  emits('update:modelValue', state.iconPrefix + state.checkIcon.font_class)
  state.iconDialogVisible = false
}
</script>

<style lang="scss" scoped>
.icon-input {
  .SvgIcon {
    width: 1rem;
    height: 1rem;
  }
}

.icon-list {
  overflow: auto;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 150px;
    font-size: 13px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);

    .icon-wapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      .icon-code,
      .icon-name {
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
