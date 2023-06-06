import { createApp, Directive } from 'vue'
import { createPinia } from 'pinia'
import { router } from '~/router'
import App from './App.vue'
import { loadAllPlugins } from './plugins'
import currency from 'currency.js'
// import { MouseMenuDirective } from '@howdyjs/mouse-menu'

import '~/styles/index.scss'
import * as directives from '~/directives'
import '~/permission'
import '~/utils/extension/floatextension'
import '~/assets/icons/menu/iconfont.js'
import '~/assets/icons/operate/iconfont.js'

import ConstTable from '~/components/table/index.vue'
import ConstDialog from '~/components/dialog/index.vue'
import ConstFilter from '~/components/filter/index.vue'
import ConstFilterItem from '~/components/filter/Item.vue'
import ConstUpload from '~/components/upload/index.vue'
import SvgIcon from '~/components/svg-icon/index.vue'

const app = createApp(App)
const pinia = createPinia()
// 加载所有插件
loadAllPlugins(app)

// 修改组件默认属性值
app._context.components.ElTableColumn['props'].showOverflowTooltip.default = true;
app._context.components.ElInput['props'].showWordLimit.default = true
app._context.components.ElInput['props'].clearable.default = true;
app._context.components.ElSelect['props'].filterable.default = true
app._context.components.ElSelect['props'].clearable.default = true;
// app._context.components.ElSelectTree['props'].filterable.default = true
// app._context.components.ElSelectTree['props'].clearable.default = true;

// 全局函数
app.config.globalProperties.currency = (v: string | number) => currency(v, { symbol: '￥' })
app.config.globalProperties.fmtMoney = (v: string | number) => app.config.globalProperties.currency(v).format();

// 全局组件
app.component('ConstTable', ConstTable)
app.component('ConstDialog', ConstDialog)
app.component('ConstFilter', ConstFilter)
app.component('ConstFilterItem', ConstFilterItem)
app.component('ConstUpload', ConstUpload)
app.component('SvgIcon', SvgIcon)

// 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, (directives as { [key: string ]: Directive })[key])
})
// app.directive("mouse-menu", MouseMenuDirective)

// 全局异常处理
app.config.errorHandler = (err, vm, info) => {
  console.error('[全局异常]', err, vm, info);
  
}

app.use(router).use(pinia).mount('#app')
