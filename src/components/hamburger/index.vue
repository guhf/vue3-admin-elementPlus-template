<template>
  <div>
    <el-icon v-if="isActive" :size="20"><Fold /></el-icon>
    <el-icon v-else :size="20"><Expand /></el-icon>
  </div>
</template>

<script lang="ts" setup>
import { Expand, Fold } from '@element-plus/icons-vue'

interface Props {
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false
})

</script>
