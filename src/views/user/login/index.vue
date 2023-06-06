<template>
  <div v-loading="state.loading" :element-loading-text="state.loadingText" :element-loading-svg="svg2" element-loading-svg-view-box="0 0 100 100" element-loading-background="rgba(122, 122, 122, 0.8)" class="login-container customer-loading">
    <el-form ref="loginFormRef" :model="state.lgionInfo" :rules="state.loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
        <!-- <LangSelect class="set-language" /> -->
      </div>

      <el-form-item prop="username">
        <el-input ref="userNameRef" v-model="state.lgionInfo.username" placeholder="请输入账号" type="text" size="large" tabindex="1" autocomplete="on" :prefix-icon="User" />
      </el-form-item>
      <el-tooltip v-model:visible="state.capsTooltip" content="大写锁定已打开" placement="right" manual>
        <el-form-item prop="password">
          <el-input ref="passwordRef" v-model="state.lgionInfo.password" placeholder="请输入密码" size="large" tabindex="2" autocomplete="on" :prefix-icon="Lock" show-password @keyup="checkCapslock" @blur="state.capsTooltip = false" @keyup.enter="handleLogin" />
        </el-form-item>
      </el-tooltip>

      <el-button :loading="state.loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.prevent="handleLogin"> 登录 </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Lock, User } from '@element-plus/icons-vue'
import type { LocationQuery } from 'vue-router'
import type { FormInstance } from 'element-plus'
// import LangSelect from '~/components/lang-select/index.vue'

import type { LoginInfo } from '~/models/userModel'
import { useUserStore } from '~/store/user'
import { svg2 } from '~/constant/loading'

const loginFormRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()

const state = reactive({
  lgionInfo: {} as LoginInfo,
  loginRules: {
    userName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  },
  loading: false,
  loadingText: '正在登录...',
  capsTooltip: false,
  redirect: '',
  otherQuery: {},
})

const handleLogin = () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      state.loading = true

      useUserStore()
        .login(state.lgionInfo)
        .then(() => {
          state.loading = false

          nextTick(() => {
            state.loadingText = '正在加载资源...'
            state.loading = true
          })

          const redirect = route.query.redirect?.toString() ?? '/'
          const otherQuery = getOtherQuery(route.query)

          router
            .push({
              path: redirect,
              query: otherQuery,
            })
            .then(() => {
              state.loading = false
            })
        })
        .catch(() => {
          state.loading = false
        })
    } else {
      return false
    }
  })
}

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  if (key) {
    state.capsTooltip = key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
  }
}

const getOtherQuery = (query: LocationQuery) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {} as LocationQuery)
}
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url('../../../assets/images/login/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:before {
    content: '';
    background-color: rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .login-form {
    position: relative;
    width: 420px;
    padding: 60px 40px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 5px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #d1d1d1;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  :deep(.el-input__icon.el-icon) {
    height: inherit;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $primary;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: rgb(109, 30, 30);
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 470px) {
  }
}
</style>
