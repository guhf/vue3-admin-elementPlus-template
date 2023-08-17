import path from 'path'
import { UserConfig, ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = (dir: string) => path.join(__dirname, dir)

const root = process.cwd();
const envResolve = (mode: string, env: string) => loadEnv(mode, root)[env];

export default defineConfig(({ mode } : ConfigEnv): UserConfig => {
  const host = envResolve(mode, 'VITE_DOMAIN_URL')
  const devPort = parseInt(envResolve(mode, 'VITE_DOMAIN_PORT'))
  
  let outPutDir = '';
  switch (mode) {
    case 'preview':  //测试环境
      outPutDir = 'dist/preview';
      break;
    case 'production':  //生产环境
      outPutDir = 'dist/production';
      break;
    default:
      outPutDir = 'dist';
      break;
  }

  return {
    root,
    resolve:{
      alias:{
        '~/': `${resolve('src')}/`,
        // '*': resolve(''),
        // components: resolve('src/components'),
        // apis: resolve('src/apis'),
        // utils: resolve('src/utils'),
        // styles: resolve('src/styles')
      }
    },
    server: {
      host: host,
      port: devPort,
      //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
      open: false,
    },
    // 生产环境打包配置
    build: {
      target: 'es2015',
      minify: 'esbuild',
      assetsDir: 'assets',
      outDir: outPutDir,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          //静态资源分拆打包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
    esbuild: {
      // 是否保留 console debugger
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
    },
    css: {
      //css预处理
      preprocessorOptions: {
        scss: {
          additionalData: `@use './src/styles/element/index.scss' as *; @use './src/styles/variables.scss' as *;`
        },
      },
    },
    plugins: [
      vue(),
      //按需引用样式
      ElementPlus({
        useSource: true,
      }),
      //自动导入
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver({
            //添加后更改主题色才会生效
            importStyle: 'sass'
          }),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          })
        ],
        dts: false,
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver({
            //添加后更改主题色才会生效
            importStyle: 'sass'
          })
        ],
        dts: false,

        //防止组件命名重复警告
        directoryAsNamespace: true,
      }),
      Icons({
        autoInstall: true,
      }),
      // gzip压缩 生产环境生成 .gz 文件, 需要服务器端配合配置
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      DefineOptions(),
      vueJsx()
    ],
  };
});