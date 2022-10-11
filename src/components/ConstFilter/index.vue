<template>
  <div ref="filterRef" class="filter-warp" tabindex="180429">
    <div v-if="state.showMore !== true" class="filter-tool">
      <div ref="containerRef" class="filter-container">
        <slot />
      </div>
      <div class="filter-btns">
        <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
        <el-button class="btn-item" :icon="RefreshRight" @click="reset">重置</el-button>
        <el-button v-show="state.showMoreIcon === true" class="btn-item" type="warning" :icon="ArrowDownBold" title="展开" @click="showMore(true)" />
      </div>
    </div>
    <div v-if="state.showMore" class="filter-tool-more">
      <div ref="containerRef" class="filter-container">
        <slot />
      </div>
      <div class="filter-btns">
        <el-button class="btn-item" type="primary" :icon="Search" @click="filter">搜索</el-button>
        <el-button class="btn-item" :icon="RefreshRight" @click="reset">重置</el-button>
        <el-button class="btn-item" type="info" :icon="ArrowUpBold" title="收起" @click="showMore(false)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch, onUpdated } from 'vue'
import { Search, RefreshRight, ArrowDownBold, ArrowUpBold } from '@element-plus/icons-vue'

const emits = defineEmits<{
  (e: 'search', pageQuery: object): void
  (e: 'reset', val: object): void
}>()

const filterRef = ref<ElRef>()
const containerRef = ref<ElRef>()

const state = reactive({
  showMore: false as boolean,
  showMoreIcon: false as boolean,
})

onMounted(() => {
  if (!containerRef.value) return
  state.showMoreIcon = containerRef.value.clientHeight > 34
})

onUpdated(() => {
  if (!containerRef.value) return
  state.showMoreIcon = containerRef.value.clientHeight > 34
})

watch(
  () => containerRef.value,
  () => {
    if (containerRef.value) {
      state.showMoreIcon = containerRef.value.clientHeight > 34
    }
  },
  {
    deep: true,
  }
)

const showMore = (show: boolean) => {
  state.showMore = show
  // if(show) filterRef.value.focus();
}

const filter = (val: object) => {
  state.showMore = false
  emits('search', val)
}

const reset = (val: object) => {
  state.showMore = false
  emits('reset', val)
}
</script>

<style lang="scss" scoped>
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
