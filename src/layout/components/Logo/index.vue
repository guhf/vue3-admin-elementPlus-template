<template>
  <div class="logo-container top-logo" :class="{ expand: !collapse }">
    <transition name="logo-fade">
      <router-link v-if="collapse" key="collapse" class="logo-link" to="/">
        <img class="logo" :src="Logo" />
      </router-link>
      <router-link v-else key="expand" class="logo-link" to="/">
        <img class="logo" :src="Logo" />
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import settings from '~/config/setting.config'
import Logo from '~/assets/images/logo.png'

interface Props {
  collapse: boolean
}

withDefaults(defineProps<Props>(), {
  collapse: true,
})

const title = settings.title
</script>

<style lang="scss" scoped>
.logo-fade-enter-active {
  transition: opacity 1s;
}

.logo-fade-enter-from,
.logo-fade-leave-to {
  opacity: 0;
}

.logo-container {
  position: relative;
  width: 100%;
  height: 86px;
  line-height: 120px;
  text-align: center;
  overflow: hidden;

  & .logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    & .logo {
      width: 30px;
      display: inline-block;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: $primary;
      font-weight: 600;
      font-size: 22px;
      vertical-align: middle;
    }
  }

  &.expand {
    .logo {
      margin-right: 10px;
    }
  }
}

.top-logo {
  padding: 15px 0;
}
</style>
