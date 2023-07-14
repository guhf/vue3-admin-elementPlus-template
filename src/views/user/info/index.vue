<template>
  <div class="app-main-wrapper">
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <div class="info-title">
          <span>基本信息</span>
        </div>
        <Basic />
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <div class="info-title">
          <span>修改密码</span>
        </div>
        <Password />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import Basic from './basic.vue'
import Password from './password.vue'

defineOptions({
  name: 'UserInfo',
})
</script>
<style>
.info-title {
  line-height: 40px;
  border-bottom: 1px solid #d1d1d1;
  margin-bottom: 15px;
  font-size: 1.4rem;
  padding: 0 10px;
}
</style>
