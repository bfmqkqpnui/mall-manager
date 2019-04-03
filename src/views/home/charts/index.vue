<template>
  <div class="chartBody">
    <v-chart :options="chartData" :auto-resize="true" ref="chart"></v-chart>
  </div>
</template>

<script>

export default {
  data() {
    return {
      chartData: {}
    }
  },
  created() {
    this.chartData = {
      // 报表标题
      title: {
        text: '线形图',
        left: 'center',
        top: 0,
        textStyle: {
          color: '#ccc'
        },
        // 副标题
        subtext: '测试'
      },
      // 鼠标移动显示数值
      tooltip: {
        trigger: 'axis'
      },
      // 报表工具
      toolbox: {
        left: 'right',
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          magicType: {type: ['line', 'bar']},
          restore: {},
          saveAsImage: {}
        }
      },
      // X轴数据
      xAxis: {
          type: 'category',
          data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      },
      // y轴数据
      yAxis: {
          type: 'value',
          splitLine: {
            show: true
          }
      },
      // 数据和类型
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
        markLine: {
          silent: true,
          data: [{
              yAxis: 300
          }, {
              yAxis: 600
          }, {
              yAxis: 900
          }, {
              yAxis: 1200
          }, {
              yAxis: 1500
          }]
        }
      }]
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.chart.resize({width: 900, height: 600})
    }, 50)
  }
}
</script>

<style scoped>
.chartBody {
  width: 100%;
  height: 100%;
}
</style>