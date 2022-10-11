<template>
  <div id="followUpRecordNumChart" :class="className" :style="{height: height, width: width}"/>
</template>

<script lang="ts" setup>
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, nextTick, reactive } from 'vue'
import resize from '@/components/charts/mixins/resize'
import { init, EChartsOption } from 'echarts'

import { getFollowUpRecordNumChart } from '@/apis/relation/followuprecord'

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
    getFollowUpRecordNumChart(cycle).then((res: any) =>{
      initChart(res.data)
    })
  }
  
  const initChart = (options: any) => {
    const barChart = init(document.getElementById('followUpRecordNumChart') as HTMLDivElement, 'macarons')
    barChart.setOption({
      title: [{
        text: '跟进记录',
        textStyle: {
          color: '#000',
          fontSize: 14,
        },
      }],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 40,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: options.xaxis,
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        name: '次',
        type: 'value',
        nameGap: '-6',
        nameTextStyle: {
          color: '#333'
        }
      }],
      series: [{
        name: options.series[0].name,
        type: options.series[0].type,
        stack: 'vistors',
        data: options.series[0].data,
      }, {
        name: options.series[1].name,
        type: options.series[1].type,
        stack: 'vistors',
        data: options.series[1].data,
      }]
    } as EChartsOption)
    chart.value = barChart
  }
</script>
