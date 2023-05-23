<template>
  <el-dropdown>
    <svg class="icon" aria-hidden="true" font-size="45px" :class="{'svg-color': isWhite}">
      <use xlink:href="#iconzhongyingwen" />
    </svg>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in stateData.languages" :key="item.value" :disabled="language===item.value">
          <span @click="handleSetLanguage(item.value)">{{ item.name }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useAppStore } from '~/store/app'
import { useI18n } from 'vue-i18n/index'
import { ElMessage } from 'element-plus'

interface Props {
  isWhite?: boolean
}

withDefaults(defineProps<Props>(), {
  isWhite: false
})

type Language = {
    name: string
    value: string
}

const appStore = useAppStore()
const { locale } = useI18n()

const language = computed(() => {
  return appStore.language
})

const stateData = reactive({
  languages: [{ name: 'en', value: 'en' }, { name: '中文', value: 'zh-cn' }] as Array<Language>

})

const handleSetLanguage = (lang: string) => {
  locale.value = lang
  appStore.setLanguage(lang)
  ElMessage({
    message: lang === 'en' ? 'Switch Language Success' : '语言切换成功',
    type: 'success'
  })
}

</script>

<style lang="scss" scoped>
.svg-color{
  fill: white;
}
</style>
