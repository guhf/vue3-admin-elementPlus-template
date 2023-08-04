<template>
  <el-drawer ref="drawerRef" v-model="drawerVisible" direction="rtl" :size="360" :show-close="false" destroy-on-close @close="closeNotifyDrawer">
    <template #header>
      <span>通知中心</span>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-icon v-if="stateData.notifyClassNum === 1" class="el-icon--left"><bell-filled /></el-icon>
          <el-icon v-else class="el-icon--left"><bell /></el-icon>
          {{ stateData.notifyClass }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="BellFilled" @click="filterNotify(1, '未读通知')">未读通知</el-dropdown-item>
            <el-dropdown-item :icon="Bell" @click="filterNotify(2, '全部通知')">全部通知</el-dropdown-item>
            <el-dropdown-item :icon="Checked" @click="filterNotify(9, '')">标记所有为已读</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </template>
    <ul v-infinite-scroll="loadData" class="notify-list" :infinite-scroll-disabled="disabled" style="height: calc(100vh - 60px); overflow: auto">
      <li v-for="(item, index) in stateData.notifyData" :key="index" class="notify-list-item">
        <a
          ><p>{{ item.pName }}</p></a
        >
        <span @click="jumpTarget(item.id, item.target)"
          ><a>{{ `${item.refCode}  ${item.refTitle}  ` }}</a
          >{{ `${item.senderName}${item.content}` }}</span
        >
        <span class="datetime">{{ item.sendTime }}</span>
      </li>
      <p v-if="stateData.loading">正在加载中...</p>
      <p v-if="stateData.noMore">没有更多内容</p>
    </ul>
  </el-drawer>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { ElDrawer } from 'element-plus'
import { ArrowDown, Bell, BellFilled, Checked } from '@element-plus/icons-vue'
import type { Notify } from '~/models/common/notifyModel'
import { useUserStore } from '~/store/user'
import { useRouterPush } from '~/hooks'

import { getNotifyPageList, getUnReadNotifyList, updateAllFlag, updateFlag } from '~/apis/user/notify'

interface Props {
  modelValue?: boolean
  data: Notify[]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  data: () => [],
})

const emits = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>()

const userStore = useUserStore()
const stateData = reactive({
  notifyData: [] as any,
  loading: false,
  noMore: false,
  pageQuery: {
    pageIndex: 0 as number,
    pageSize: 20 as number,
  } as any,
  notifyClassNum: 1,
  notifyClass: '未读通知',
})
const drawerRef = ref<InstanceType<typeof ElDrawer>>()

const disabled = computed(() => stateData.loading || stateData.noMore)

const drawerVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  },
})

onMounted(() => {
  stateData.notifyData = props.data
})

onUnmounted(() => {
  stateData.loading = false
  stateData.noMore = false
})

const loadData = () => {
  stateData.loading = true
  if (stateData.notifyClassNum === 1) {
    getUnReadNotifyData()
  } else {
    getAllNotifyData()
  }
}

const getUnReadNotifyData = () => {
  stateData.pageQuery.pageIndex++

  getUnReadNotifyList(stateData.pageQuery)
    .then((res: any) => {
      if (res.total > 0) {
        stateData.notifyData = stateData.notifyData.concat(res.stateData)
      }
      stateData.loading = false
      stateData.noMore = stateData.notifyData.length >= (res.total ?? 0)
    })
    .catch(() => {
      stateData.loading = false
    })
}

const getAllNotifyData = () => {
  stateData.pageQuery.pageIndex++

  getNotifyPageList(stateData.pageQuery)
    .then((res: any) => {
      if (res.total > 0) {
        stateData.notifyData = stateData.notifyData.concat(res.stateData)
      }

      stateData.loading = false
      stateData.noMore = stateData.notifyData.length >= (res.total ?? 0)
    })
    .catch(() => {
      stateData.loading = false
    })
}

const filterNotify = (type: number, name: string) => {
  if (type > 5) {
    setAllRead()
  } else {
    if (stateData.notifyClassNum === type) return

    stateData.notifyClassNum = type
    stateData.notifyClass = name

    stateData.pageQuery.pageIndex = 0
    stateData.notifyData = []
    loadData()
  }
}

const jumpTarget = (id: number, to: string) => {
  useRouterPush({
    path: to,
  }).then(() => {
    drawerRef.value?.handleClose()
    setRead(id)
  })
}

const setAllRead = () => {
  updateAllFlag().then(() => {
    stateData.pageQuery.pageIndex = 0
    loadData()
    userStore.notifyTotal = 0
  })
}

const setRead = (id: number) => {
  updateFlag(id).then(() => {
    userStore.notifyTotal = userStore.notifyTotal - 1
  })
}

const closeNotifyDrawer = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.el-dropdown {
  .el-dropdown-link {
    font-size: 16px;
    cursor: pointer;
    color: $primary;
  }
  .el-icon--left {
    font-size: 16px;
    vertical-align: top;
  }

  .el-icon--right {
    font-size: 14px;
    vertical-align: top;
  }
}

.notify-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: initial;

  .notify-list-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    color: #333;
    font-size: 15px;
    line-height: 1.5;
    padding: 15px 25px;
    border-bottom: 1px solid #f2f2f2;

    span {
      margin-top: 10px;
    }

    .datetime {
      font-size: 14px;
      color: #ababab;
    }
  }
  > p {
    font-size: 12px;
    margin-top: 15px;
  }
}
</style>
