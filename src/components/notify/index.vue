<template>
  <div>
    <el-popover placement="bottom" :width="400" :popper-style="{ padding: 0 }">
      <div class="message-box">
        <div class="message-box-title">
          <p>消息中心</p>
          <div class="message-box-title-tools">
            <router-link to="/user/message">更多</router-link>
          </div>
        </div>
        <ul v-if="state.messageData.length > 0" class="message-box-content">
          <li v-for="message in state.messageData" :key="message.id">
            <span class="message-title">{{ message.title }}</span>
            <span class="message-datetime">{{ message.sendTime }}</span>
          </li>
        </ul>
        <el-empty v-else description="暂无消息~~" />
      </div>
      <template #reference>
        <el-badge :value="messageTotal > 0 ? messageTotal : ''" :max="99">
          <el-icon v-if="messageTotal > 0" :size="20"><BellFilled /></el-icon>
          <el-icon v-else :size="20"><Bell /></el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'
import { Bell, BellFilled } from '@element-plus/icons-vue'
import type { Response } from '~/models/response'
import type { Message, Notify } from '~/models/common/messageModel'
import { useSignalR } from '~/hooks'

import { getUnReadMessageList } from '~/apis/user/message'

const { receiveClient } = useSignalR()

onMounted(async () => {
  await getMessageData()

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

  receiveClient('ReceiveMessageTotal', (total: number) => {
    messageTotal.value = total
  })
})

let messageTotal = ref(0)
const state = reactive({
  messageData: [] as Message[],
})
const getMessageData = () => {
  return getUnReadMessageList({}).then((res: Response<Message[]>) => {
    if (res.total) {
      state.messageData = res.data
      messageTotal.value = res.total
    } else {
      messageTotal.value = 0
    }
  })
}
</script>

<style lang="scss" scoped>
.message-box {
  .message-box-title {
    // height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e3;
    padding: 15px;

    p {
      font-size: 14px;
      font-weight: 700;
    }
    .message-box-title-total a {
      color: $primary;
    }
  }

  .message-box-content {
    max-height: 500px;
    display: flex;
    flex-direction: column;
    list-style: none;
    overflow: auto;

    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 15px;
      border-bottom: 1px solid #e3e3e3;
      cursor: pointer;

      .message-title {
        line-height: 2;
        font-size: 14px;
      }
      .message-datetime {
        line-height: 2;
        font-size: 12px;
      }
    }
  }
}
</style>
