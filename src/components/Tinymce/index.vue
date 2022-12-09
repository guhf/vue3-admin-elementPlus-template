<template>
  <div :class="{fullscreen: state.fullscreen}" class="tinymce-container" :style="{width: state.containerWidth}">
    <TinymceEditor :id="id" v-model:value="state.tinymceContent" :init="initOptions" />
  </div>
</template>

<script lang="ts" setup>
// Docs: https://www.tiny.cloud/docs/advanced/usage-with-module-loaders/
// Import TinyMCE
import 'tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'
import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
import EditorImageUpload, { UploadObject } from './components/EditorImage.vue'
import { plugins, toolbar } from './config'
import { reactive, watch, nextTick, ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import { useAppStore } from '@/store/app'
import { useSettingsStore } from '@/store/settings'

interface Props {
  /** 初始内容 */
  value?: string
  /** id */
  id?: string
  /** 上传文件列表 */
  toolbar?: any[]
  /** 菜单栏 */
  menubar?: string
  /** 高度 */
  height?: number | string
  /** 宽度 */
  width?: string | number
  /** 单文件最大限制,单位:MB */
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  id: 'vue-tinymce-' + new Date() + ((Math.random() * 1000).toFixed(0) + ''),
  toolbar: () => { return [] },
  menubar: 'file edit insert view format table',
  height: '360',
  width: 'auto',
  tag: ''
})

const emits = defineEmits<{(e: 'input', content: string): void
}>()

const userStore = useUserStore()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const state = reactive({
  hasChange: false,
  hasInit: false,
  fullscreen: true,
  getlanguage: () => {
    return appStore.language
  },
  uploadButtonColor: () => {
    return settingsStore.theme
  },
  tinymceContent: computed(() => {
    return props.value
  }),
  containerWidth: () => {
    const width = props.width
    // Test matches `100`, `'100'`
    if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
      return `${width}px`
    }
    return width
  }
})
const token = userStore.token

const initOptions = ref(
  {
    selector: `#${props.id}`,
    height: props.height,
    language: 'zh_CN',
    body_class: 'panel-body',
    branding: false,
    object_resizing: false,
    toolbar: props.toolbar.length > 0 ? props.toolbar : toolbar,
    menubar: props.menubar,
    plugins: plugins,
    language_url: 'tinymce/langs/zh_CN.js',
    skin_url: `tinymce/skins`,
    content_css: 'tinymce/skins/content.min.css',
    emoticons_database_url: `tinymce/emojis.min.js`,
    end_container_on_empty_block: true,
    powerpaste_word_import: 'merge',
    code_dialog_height: 450,
    code_dialog_width: 1000,
    advlist_bullet_styles: 'square',
    advlist_number_styles: 'default',
    // imagetools_cors_hosts: ['ezhu.me','ezhu.com','ezhuchina.com'], //开启跨域白名单
    // imagetools_proxy: 'proxy.php', //配置图片代理，和上面一起才能使用图片编辑插件
    paste_data_images: true, // 粘贴图片
    urlconverter_callback: (url: any, node: any, onSave: any, name: any) => {
      if (node === 'img' && url.startsWith('blob:')) {
        const tinymce = (window as any).tinymce.get(props.id)
        tinymce.activeEditor && tinymce.activeEditor.uploadImages()
      }
      return url
    },
    images_upload_handler: (blobInfo: any, succFun: any, failFun: any) => {
      let xhr: any, formData
      const file = blobInfo.blob()// 转化为易于理解的file对象
      xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', import.meta.env.VITE_API_URL + 'file/upload')
      xhr.setRequestHeader('Authorization', token)
      xhr.onload = function() {
        let json
        if (xhr.status != 200) {
          failFun('HTTP Error: ' + xhr.status)
          return
        }
        json = JSON.parse(xhr.responseText)
        if (!json || typeof json.data[0].filePath !== 'string') {
          failFun('Invalid JSON: ' + xhr.responseText)
          return
        }

        succFun(json.data[0].url)
      }
      formData = new FormData()
      formData.append('tag', props.tag)
      formData.append('file', file, file.name)// 此处与源文档不一样
      xhr.send(formData)
    },
    default_link_target: '_blank',
    link_title: false,
    nonbreaking_force_tab: true,
    init_instance_callback: (editor: any) => {
      if (props.value) {
        editor.setContent(props.value)
      }
      state.hasInit = true
      editor.on('NodeChange Change KeyUp SetContent', () => {
        state.hasChange = true
        emits('input', editor.getContent())
      })
    },
    setup: (editor: any) => {
      editor.on('FullscreenStateChanged', (e: any) => {
        state.fullscreen = e.state
      })
    },
    convert_urls: true
  }
)

watch(() => appStore.language, () => {
  const tinymceManager = (window as any).tinymce
  const tinymceInstance = tinymceManager.get(props.id)
  if (state.fullscreen) {
    tinymceInstance.execCommand('mceFullScreen')
  }
  if (tinymceInstance) {
    tinymceInstance.destroy()
  }
  nextTick(() => {
    tinymceManager.init(initOptions)
  })
})

watch(() => state.tinymceContent, (value) => {
})

const imageSuccessCBK = (arr: UploadObject[]) => {
  const tinymce = (window as any).tinymce.get(props.id)
  arr.forEach((v) => {
    tinymce.insertContent(`<img class="wscnph" src="${v.url}" >`)
  })
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
  .mce-fullscreen {
    z-index: 10000;
  }
}
.editor-custom-btn-container {
  position: absolute !important;
  right: 6px;
  top: 6px;
  z-index: 1002;
}
.editor-upload-btn {
  display: inline-block;
}
textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
