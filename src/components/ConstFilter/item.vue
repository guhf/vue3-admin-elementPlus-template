<template>
  <div class="filter-item">
    <label>{{ label }}</label>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>

interface Props {
  label: string
}

withDefaults(defineProps<Props>(), {
  label: '',
})

</script>

<style lang="scss" scoped>
.filter-item{
  line-height: normal;
  display: inline-table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  label{
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

  :deep(.el-input__wrapper){
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding-right: 30px;

    // 解决筛选条件没有布满一行时，输入框输入内容后，有焦点时输入框宽度会变化
    .el-input__suffix{
      position: absolute;
      right: 10px;
    }
  }
} 
</style>