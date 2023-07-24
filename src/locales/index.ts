import { createI18n } from 'vue-i18n'

// import elementEnLocale from 'element-plus/lib/locale/lang/en'
// import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'
import { getLanguage } from '~/utils/cache'

const messages = {
  en: {
    ...enLocale,
  },
  'zh-cn': {
    ...zhLocale,
  },
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.includes(locale)) {
      return locale
    }
  }

  return 'zh'
}

const i18n = createI18n({
  locale: getLocale(),
  messages,
})

export default i18n
