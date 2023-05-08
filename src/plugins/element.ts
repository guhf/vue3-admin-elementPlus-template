import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import i18n from '~/locales'

// 修改默认组件属性

export default function loadComponent(app: any) {
  app.use(ElementPlus, { zhCn })// size: "medium"
}
