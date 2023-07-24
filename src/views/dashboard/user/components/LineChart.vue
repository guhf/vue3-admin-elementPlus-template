<template>
  <div id="homeLineCharts" :class="className" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted, watchEffect } from 'vue'
import { init } from 'echarts'
import type { EChartsOption } from 'echarts'
import type { PropType } from 'vue'
import resize from '~/components/charts/mixins/resize'

export interface LineChartData {
  expectedData: number[]
  actualData: number[]
}

export default defineComponent({
  props: {
    className: {
      type: String,
      default: 'chart',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '350px',
    },
    chartData: {
      type: Object as PropType<LineChartData>,
      required: true,
    },
  },
  setup(props) {
    const { mounted, chart, beforeDestroy, activated, deactivated } = resize()

    const setOptions = (chartData: LineChartData) => {
      if (chart.value) {
        chart.value.setOption({
          xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            padding: 8,
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            data: ['expected', 'actual'],
          },
          series: [
            {
              name: 'expected',
              itemStyle: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2,
                },
              },
              smooth: true,
              type: 'line',
              data: chartData.expectedData,
              animationDuration: 2800,
              animationEasing: 'cubicInOut',
            },
            {
              name: 'actual',
              smooth: true,
              type: 'line',
              itemStyle: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2,
                },
                areaStyle: {
                  color: '#f3f8ff',
                },
              },
              data: chartData.actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut',
            },
          ],
        } as EChartsOption)
      }
    }

    watchEffect(() => {
      if (props.chartData) {
        setOptions(props.chartData)
      }
    })

    const initChart = () => {
      const lineChart = init(document.querySelector('#homeLineCharts') as HTMLDivElement, 'macarons')
      setOptions(props.chartData)
      chart.value = lineChart
    }

    onMounted(() => {
      mounted()
      nextTick(() => {
        initChart()
      })
    })

    onBeforeUnmount(() => {
      beforeDestroy()
      if (!chart.value) {
        return
      }
      chart.value.dispose()
      chart.value = null
    })

    onActivated(() => {
      activated()
    })

    onDeactivated(() => {
      deactivated()
    })

    return {}
  },
})
</script>
