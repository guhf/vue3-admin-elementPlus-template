<template>
  <div class="filter-item" :style="{ '--num': itemNum }">
    <label>{{ label }}</label>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import emitter from '~/utils/emitt'

interface Props {
  label: string
}

withDefaults(defineProps<Props>(), {
  label: '',
})

let itemNum = ref<number>(0)

onMounted(() => {
  emitter.on('setFilterItemNum', (num: number) => {
    itemNum.value = num
  })
})
</script>

<style lang="scss" scoped>
.filter-item {
  width: calc((100% - 10px * var(--num)) / var(--num));
  max-width: 300px;
  flex-shrink: 0;
  line-height: normal;
  display: inline-table;
  border-collapse: separate;
  border-spacing: 0;
  margin-right: 10px;

  label {
    padding: 0 10px;
    background-color: var(--el-fill-color-light);
    color: var(--el-color-info);
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 1px;
    white-space: nowrap;
    font-size: 13px;
    border-right: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :deep(.el-input__wrapper) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-right: 30px;

    // 解决筛选条件没有布满一行时，输入框输入内容后，有焦点时输入框宽度会变化
    .el-input__suffix {
      position: absolute;
      right: 10px;
    }
  }
}
</style>
