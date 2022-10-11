
<template>
  <div class="dashboard-container">
    <component :is="AdminDashboard" v-if="isSuper" />
    <component :is="AdminDashboard" v-else-if="isAdmin" />
    <component :is="UserDashboard" v-else />
    <!-- <component :is="AdminDashboard" /> -->
  </div>
</template>
<script lang="ts" setup>
import { computed, onBeforeMount, onUnmounted, ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useSignalR } from '@/hooks/event/signalR'
import { UserRole } from '@/models/userModel'
import AdminDashboard from './admin/index.vue'
import UserDashboard from './user/index.vue'

const userStore = useUserStore()
const { stopConnection } = useSignalR()
const roles = computed(() => {
  return userStore.userInfo.userRoles
})
const isSuper = ref(false)
const isAdmin = ref(true)

onBeforeMount(() => {
  (roles.value as UserRole[]).forEach((role: any) => {
    if (role.isSuper) {
      isSuper.value = true
    } else if (role.isAdmin) {
      isAdmin.value = true
    }
  })
})

onUnmounted(() => {
  stopConnection()
})
</script>
