<template>
  <div class="tools-wrap">
    <template v-if="device !== DeviceType.Mobile">
      <!-- <LangSelect class="tools-item hover-effect" /> -->
      <Notify class="tools-item hover-effect" />
    </template>
    <el-dropdown class="avatar-container tools-item hover-effect" trigger="click">
      <div class="avatar-wrapper">
        <el-avatar :size="30" :src="userInfo.avatar" />
        <span>{{ userInfo.userName }}</span>
        <el-icon class="el-icon-caret-bottom"><CaretBottom /></el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <router-link to="/user/info">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CaretBottom } from '@element-plus/icons-vue'
import { DeviceType, useAppStore } from '~/store/app'
import { useUserStore } from '~/store/user'

const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const device = computed(() => {
  return appStore.device
})

const userInfo = computed(() => {
  return userStore.userInfo
})

const logout = () => {
  userStore.logout()
  router.push(`/login?redirect=${route.fullPath}`).catch((err) => {
    console.warn(err)
  })
}
</script>

<style lang="scss" scoped>
.tools-wrap {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 15px;

  &:focus {
    outline: none;
  }

  .tools-item {
    height: 100%;
    color: #666666;
    padding: 0 5px;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
    }

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .avatar-container {
    color: #666666;

    .avatar-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;

      * {
        margin-right: 8px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        // top: 1px;
        font-size: 20px;
      }
    }
  }
}
</style>
