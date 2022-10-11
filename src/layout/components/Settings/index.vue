<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ t('settings.title') }}
      </h3>

      <div class="drawer-item">
        <span>{{ t('settings.showTagsView') }}</span>
        <el-switch
          v-model="stateData.showTagsView"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.showSidebarLogo') }}</span>
        <el-switch
          v-model="stateData.showSidebarLogo"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.fixedHeader') }}</span>
        <el-switch
          v-model="stateData.fixedHeader"
          class="drawer-switch"
        />
      </div>

      <div class="drawer-item">
        <span>{{ t('settings.sidebarTextTheme') }}</span>
        <el-switch
          v-model="stateData.sidebarTextTheme"
          class="drawer-switch"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '@/store/settings'
import { reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n/index'

const settingsStore = useSettingsStore()
const { t } = useI18n()
const stateData = reactive({
  fixedHeader: settingsStore.fixedHeader,
  showTagsView: settingsStore.showTagsView,
  showSidebarLogo: settingsStore.showSidebarLogo,
  sidebarTextTheme: settingsStore.sidebarTextTheme,
  themeChange: (value: string) => {
    settingsStore.changeSetting({ key: 'theme', value })
  }
})

watch(() => stateData.fixedHeader, (value) => {
  settingsStore.changeSetting({ key: 'fixedHeader', value })
})

watch(() => stateData.showTagsView, (value) => {
  settingsStore.changeSetting({ key: 'showTagsView', value })
})

watch(() => stateData.showSidebarLogo, (value) => {
  settingsStore.changeSetting({ key: 'showSidebarLogo', value })
})

watch(() => stateData.sidebarTextTheme, (value) => {
  settingsStore.changeSetting({ key: 'sidebarTextTheme', value })
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
