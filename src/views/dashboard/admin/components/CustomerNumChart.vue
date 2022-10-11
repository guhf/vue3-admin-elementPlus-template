<template>
  <div id="customerNumChart" :class="className" :style="{height: height, width: width}"/>
</template>

<script lang="ts" setup>
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, nextTick } from 'vue'
import resize from '@/components/charts/mixins/resize'
import { init, EChartsOption } from 'echarts'

import { getCustomerNumChart } from '@/apis/relation/customer'

interface Props {
  className?: string
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  className: 'chart',
  width: '100%',
  height: '300px',
})

  const {
    mounted,
    chart,
    beforeDestroy,
    activated,
    deactivated
  } = resize()

  onMounted(() => {
    mounted()
    nextTick(() => {
      getData(new Date() + ' 至 ' + new Date())
    })
  })

  onBeforeUnmount(() => {
    beforeDestroy()
  })

  onActivated(() => {
    activated()
  })

  onDeactivated(() => {
    deactivated()
  })

  const getData = (cycle: string) => {
    getCustomerNumChart(cycle).then((res: any) =>{
      initChart(res.data)
    })
  }

  const initChart = (options: any) => {
    const pieChart = init(document.getElementById('customerNumChart') as HTMLDivElement, 'macarons')
    pieChart.setOption({
      title: [{
        text: '客户数量',
        textStyle: {
          color: '#000',
          fontSize: 14,
        },
      }],
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: options.xaxis
      },
      series: [
        {
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: options.series[0].data,
          animationEasing: 'cubicInOut',
        }
      ]
    } as EChartsOption)
    chart.value = pieChart
  }
</script>
