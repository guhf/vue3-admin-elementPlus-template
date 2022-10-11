<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="stateData.lgionInfo" :rules="stateData.loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
        <!-- <LangSelect class="set-language" /> -->
      </div>

      <el-form-item prop="username">
        <el-input ref="userNameRef" v-model="stateData.lgionInfo.username" placeholder="请输入账号" type="text" size="large" tabindex="1" autocomplete="on" :prefix-icon="User" />
      </el-form-item>
      <el-tooltip v-model="stateData.capsTooltip" content="大小写锁定已打开" placement="right" manual>
        <el-form-item prop="password">
          <el-input
            ref="passwordRef" v-model="stateData.lgionInfo.password" placeholder="请输入密码" size="large" tabindex="2" autocomplete="on"
            :prefix-icon="Lock" show-password @keyup="checkCapslock" @blur="stateData.capsTooltip = false" @keyup.enter="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button :loading="stateData.loading" type="primary" style="width:100%; margin-bottom:30px;" @click.prevent="handleLogin">
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRoute, LocationQuery, useRouter } from 'vue-router'
// import LangSelect from '@/components/lang_select/index.vue'

import { useUserStore } from '@/store/user'
import { LoginInfo } from '@/models/userModel'
import { FormInstance } from 'element-plus'

const loginFormRef = ref<FormInstance>()
const router = useRouter()
const route = useRoute()

const stateData = reactive({
  lgionInfo: {} as LoginInfo,
  loginRules: {
    userName: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ]
  },
  loading: false,
  capsTooltip: false,
  redirect: '',
  otherQuery: {}
})

const handleLogin = () => {
  if (!loginFormRef.value) return

  loginFormRef.value.validate(async(valid: boolean) => {
    if (valid) {
      stateData.loading = true

      useUserStore().login(stateData.lgionInfo).then(() => {
        const redirect = route.query.redirect?.toString() ?? '/'
        const otherQuery = getOtherQuery(route.query)

        router.push({
          path: redirect,
          query: otherQuery
        })

        stateData.loading = false
      }).catch(() => {
        stateData.loading = false
      })
    } else {
      return false
    }
  })
}

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  if (key) { stateData.capsTooltip = key !== null && key.length === 1 && key >= 'A' && key <= 'Z' }
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
  background-image: url("../../../assets/images/login/bg.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:before {
    content: "";
    background-color: rgba(0, 0, 0, .2);
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

  ::v-deep(.el-input__icon.el-icon){
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
