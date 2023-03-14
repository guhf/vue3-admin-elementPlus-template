<template>
  <div ref="filterRef" class="filter-warp" tabindex="180429">
    <div class="filter-tool">
      <div ref="containerRef" class="filter-container">
        <slot />
      </div>
      <div class="filter-btns">
        <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
        <el-button class="btn-item" :icon="RefreshRight" @click="reset">重置</el-button>
        <el-button v-show="more" class="btn-item" type="warning" @click="openMore">更多筛选</el-button>
      </div>
    </div>
  </div>
  
  <el-drawer ref="drawerRef" v-model="drawerVisible" direction="rtl" :size="400" destroy-on-close>
    <template #header>
      <span>{{ props.moreTitle }}</span>
    </template>
    <div class="body">
    <slot name="more" />
    </div>
    <template #footer>
      <el-button class="btn-item" :icon="CircleClose" @click="closeMore">取消</el-button>
      <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search, RefreshRight, MoreFilled, CircleClose } from '@element-plus/icons-vue'

interface Props {
  more: boolean
  moreTitle: string
}

const props = withDefaults(defineProps<Props>(), {
  more: false,
  moreTitle: '更多筛选',
})

const emits = defineEmits<{
  (e: 'search', pageQuery: object): void
  (e: 'reset', val: object): void
}>()

const filterRef = ref<ElRef>()
const containerRef = ref<ElRef>()
const drawerVisible = ref(false)

const openMore = () => {
  drawerVisible.value = true
  // if(show) filterRef.value.focus();
}

const closeMore = () => {
  drawerVisible.value = false
}

const filter = (val: object) => {
  drawerVisible.value = false
  emits('search', val)
}

const reset = (val: object) => {
  emits('reset', val)
}

</script>

<style lang="scss" scoped>
.el-drawer__body .body{
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  *{
    margin-top: 20px;
  }

  *:not(:first-child){
    margin-top: 20px;
  }
}


.filter-warp {
  height: 34px;
  margin-bottom: 10px;
}

.filter-tool {
  max-height: 34px;
  overflow: hidden;
}

.filter-tool,
.filter-tool-more {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background-color: #ffffff;

  .filter-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    ::v-deep(.el-input-group__prepend) {
      padding: 0 10px;
    }
  }

  .filter-container-more {
    margin-right: 10px;
    cursor: pointer;
  }

  .filter-btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    // margin-top: 2px;
  }
}

.filter-tool-more {
  height: auto;
  position: absolute;
  padding: 10px;
  margin-right: 15px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  background-color: #ffffff;
  overflow: hidden;
  color: $primary;
  transition: var(--el-transition-duration);
  z-index: 99;
  // flex-direction: column;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);

  .filter-container {
    max-height: none;
  }

  .filter-btns {
    // width: 100%;
    // justify-content: center;
    // margin-top: 10px;
    margin-left: 10px;
  }
}

//>=1900的设备
@media (min-width: 2801px) {
  .filter-container {
    > ::v-deep(*) {
      margin-right: 10px;
      flex: 1 1 15%;
    }

    > :nth-child(n + 7) {
      margin-top: 15px;
    }
  }

  .filter-tool-more .filter-container {
    > ::v-deep(*) {
      flex: 1 1 16.5%;
      max-width: calc(16.5% - 6px);
    }

    > :nth-child(6n) {
      margin-right: 0;
    }
  }
}

//>=1800的设备
@media (min-width: 1801px) {
  .filter-container {
    > ::v-deep(*) {
      margin-right: 10px;
      flex: 1 1 19%;
    }

    > :nth-child(n + 6) {
      margin-top: 15px;
    }
  }

  .filter-tool-more .filter-container {
    > ::v-deep(*) {
      flex: 1 1 20%;
      max-width: calc(20% - 8px);
    }

    > :nth-child(5n) {
      margin-right: 0;
    }
  }
}

//<=1400的设备
@media (max-width: 1800px) {
  .filter-container {
    > ::v-deep(*) {
      margin-right: 10px;
      flex: 1 1 23%;
    }

    > :nth-child(n + 5) {
      margin-top: 15px;
    }
  }

  .filter-tool-more .filter-container {
    > ::v-deep(*) {
      flex: 1 1 25%;
      max-width: calc(25% - 8px);
    }

    > :nth-child(4n) {
      margin-right: 0;
    }
  }
}

// 解决筛选条件没有布满一行时，输入框输入内容后，有焦点时长度会变化
::v-deep(.el-input__wrapper){
  padding-right: 30px;

  .el-input__suffix{
    position: absolute;
    right: 10px;
  }
}
</style>
