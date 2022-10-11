<template>
  <div class="dashboard-editor-container">
    <!-- <NumPanelGroup /> -->
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <CustomerNumChart /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <FollowUpRecordNumChart /> -->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <ContractNumChart /> -->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <!-- <ProjectNumChart /> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
// import NumPanelGroup from './components/NumPanelGroup.vue'
// import FollowUpRecordNumChart from './components/FollowUpRecordNumChart.vue'
// import CustomerNumChart from './components/CustomerNumChart.vue'
// import ContractNumChart from './components/ContractNumChart.vue'
// import ProjectNumChart from './components/ProjectNumChart.vue'
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 10px 20px;
  background-color: #F2F7FF;
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
    border-radius: 8px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
