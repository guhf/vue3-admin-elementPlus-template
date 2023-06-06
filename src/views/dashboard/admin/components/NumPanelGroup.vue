<!-- 
<template>
  <el-row :gutter="24" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="clickCardPanel('/relation/customer/')">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="visits">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            客户数量
          </div>
          <CountTo ref="myCount" :start-val="0" :end-val="data.customerTotal" :duration="1500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="clickCardPanel('/relation/followuprecord/')">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="messages">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            跟进记录
          </div>
          <CountTo ref="myCount" :start-val="0" :end-val="data.followupTotal" :duration="1500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="clickCardPanel('/relation/contract/')">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="shoppings">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            合同数量
          </div>
          <CountTo ref="myCount" :start-val="0" :end-val="data.contractTotal" :duration="1500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="clickCardPanel('/project/info/')">
        <div class="card-panel-icon-wrapper icon-people">
          <img :src="purchases">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            项目数量
          </div>
          <CountTo ref="myCount" :start-val="0" :end-val="data.projectTotal" :duration="1500" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { useRouterPush } from '~/hooks'
import { CountTo } from 'vue3-count-to'
import messages from '~/assets/images/home/messages.png'
import purchases from '~/assets/images/home/purchases.png'
import shoppings from '~/assets/images/home/shoppings.png'
import visits from '~/assets/images/home/visits.png'

import { getStatisticalNumChart } from '~/apis/statistical/index'

const data = reactive({
  customerTotal: 0,
  projectTotal: 0,
  followupTotal: 0,
  contractTotal: 0
})
onMounted(() => {
  getData()
})

const getData = () => {
  getStatisticalNumChart().then((res: any) => {
    data.customerTotal = res.data.customerTotal
    data.projectTotal = res.data.projectTotal
    data.followupTotal = res.data.followupTotal
    data.contractTotal = res.data.contractTotal
  })
}

const clickCardPanel = (path: string) => {
  useRouterPush({
    path: path
  })
}

</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 10px;

  .card-panel-col {
    margin-bottom: 20px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    height: 124px;
    background: #FFFFFF;
    border-radius: 10px;
    img{
      width:60px;
      height: 60px;
      display: inline-block;
    }
    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    svg {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style> -->
