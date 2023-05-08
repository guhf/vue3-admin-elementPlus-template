<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h2>你没有权限去该页面</h2>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/dashboard">
              回首页
            </router-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img :src="state.errGif" class="some-gif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import errGif from '~/assets/images/401/401.gif'

const state = reactive({
  errGif: errGif + '?' + +new Date()
})

</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }

  .some-gif {
    margin: 0 auto;
    display: block;
  }

  .some-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
