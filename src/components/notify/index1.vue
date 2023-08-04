<template>
  <div>
    <el-badge :value="userStore.notifyTotal > 0 ? userStore.notifyTotal : ''" :max="99" class="item" title="通知中心" @click="clickHandle">
      <el-icon v-if="userStore.notifyTotal > 0" :size="20"><BellFilled /></el-icon>
      <el-icon v-else :size="20"><Bell /></el-icon>
    </el-badge>
    <Drawer v-model="stateData.drawer" :data="stateData.notifyData" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { Bell, BellFilled } from '@element-plus/icons-vue'
import Drawer from './Drawer.vue'
import type { Response } from '~/models/response'
import type { Notify } from '~/models/common/notifyModel'
import { useUserStore } from '~/store/user'
import { useSignalR } from '~/hooks'

import { getUnReadNotifyList } from '~/apis/user/notify'

const userStore = useUserStore()
const { receiveClient } = useSignalR()
const stateData = reactive({
  notifyData: [],
  drawer: false,
})

onMounted(async () => {
  await getNotifyData()

  receiveClient('ReceiveMessage', (data: Notify) => {
    let notify = ElNotification({
      type: 'success',
      title: data.title,
      message: data.content,
      position: 'bottom-right',
      duration: 5000,
      onClick: () => {
        notify.close()
      },
    })
  })
})

const getNotifyData = () => {
  return getUnReadNotifyList({}).then((res: Response<any>) => {
    if (res.total) {
      stateData.notifyData = res.data
      userStore.notifyTotal = res.total
    } else {
      userStore.notifyTotal = 0
    }
  })
}

const clickHandle = () => {
  stateData.drawer = true
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 1;
}
</style>
