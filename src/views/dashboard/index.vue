<template>
  <div class="dashboard-container">
    <component :is="AdminDashboard" v-if="userStore.isSuper" />
    <component :is="AdminDashboard" v-else-if="userStore.isAdmin" />
    <component :is="UserDashboard" v-else />
    <!-- <component :is="AdminDashboard" /> -->
  </div>
</template>
<script lang="ts" setup>
import { onUnmounted } from 'vue'
import AdminDashboard from './admin/index.vue'
import UserDashboard from './user/index.vue'
import { useUserStore } from '~/store/user'
import { useSignalR } from '~/hooks'

const userStore = useUserStore()
const { stopConnection } = useSignalR()

onUnmounted(() => {
  stopConnection()
})
</script>
