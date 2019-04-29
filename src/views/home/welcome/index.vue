<template>
  <section class="toolbar">
    <div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-aqua" @click="statAll(0)"><i class="fa fa-user"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">总用户数</span>
                <span class="info-box-number">{{ userTotal.total | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-red" @click="statAll(1)" ><i class="fa fa-pencil-square-o"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">昨日新增用户</span>
                <span class="info-box-number">{{ userTotal.yestoday | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-green" @click="statAll(7)"><i class="fa fa-bar-chart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">最近7天新增</span>
                <span class="info-box-number">{{ userTotal.before7 | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-yellow" @click="statAll(30)"><i class="fa fa-area-chart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">最近30天新增</span>
                <span class="info-box-number">{{ userTotal.before30 | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-light-blue" @click="statAll(0)"><i class="fa fa-user"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">总订单数</span>
                <span class="info-box-number">{{ orderTotal.total | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-blue" @click="statAll(1)" ><i class="fa fa-pencil-square-o"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">昨日新增订单</span>
                <span class="info-box-number">{{ orderTotal.yestoday | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-teal" @click="statAll(7)"><i class="fa fa-bar-chart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">最近7天新增</span>
                <span class="info-box-number">{{ orderTotal.before7 | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="info-box">
              <span class="info-box-icon bg-olive" @click="statAll(30)"><i class="fa fa-area-chart"></i></span>
              <div class="info-box-content">
                <span class="info-box-text">最近30天新增</span>
                <span class="info-box-number">{{ orderTotal.before30 | numFormat }}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <div class="echarts">
            <IEcharts :option="pie"></IEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <div class="echarts">
            <IEcharts :option="pie_radius"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p />
    <el-row :gutter="22">
      <el-col :xs="24" :sm="24" :md="12" :lg="12">
        <el-card class="box-card">
          <div class="echarts">
            <IEcharts :option="chartBar"></IEcharts>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
      >
        <el-card class="box-card">
          <div class="echarts">
            <IEcharts :option="bar"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p />

    <!-- <el-row :gutter="20">
      <el-col
        :xs="45"
        :sm="45"
        :md="24"
        :lg="24"
      >
        <el-card class="box-card">
          <div class="c-charts">
            <IEcharts :option="phoneBrand_chartBar"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p /> -->

    <!-- <el-row :gutter="20">
      <el-col
        :xs="45"
        :sm="45"
        :md="24"
        :lg="24"
      >
        <el-card class="box-card">
          <div class="c-charts">
            <IEcharts :option="pie_class"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
  </section>
</template>

<script>
import api from './api'
import IEcharts from "vue-echarts-v3/src/full"


export default {
  data() {
    return {
      userTotal: {
        total: 0,
        yestoday: 0,
        before7: 0,
        before30: 0
      },
      orderTotal: {
        total: 0,
        yestoday: 0,
        before7: 0,
        before30: 0
      },
      pie: {
        title: {
          text: "android/ios用户总占比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        series: [
          {
            name: "Android、ios用户总占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      pie_radius: {
        color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"],
        title: {
          text: "昨日Android/ios用户占比",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
        },
        series: [
          {
            name: "Android/ios用户占比",
            type: "pie",
            radius: ["40%", "60%"],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      chartBar: {
        color: ["#FF4949"],
        title: {
          text: "",
          subtext: "注册渠道"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["渠道"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            name: "渠道",
            type: "bar",
            data: []
          }
        ]
      },
      pie_class: {
        title: {
          text: "",
          x: "right",
          y: "bottom"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: []
        },
        series: [
          {
            name: "手机型号统计(android/ios)",
            type: "pie",
            selectedMode: "single",
            radius: [2, "50%"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          },
          {
            name: "手机型号",
            type: "pie",
            radius: ["60%", "90%"],
            data: []
          }
        ]
      },
      bar: {
        title: {
          text: "",
          x: "right"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          left: "left",
          data: []
        },
        grid: {
          x: "10%",
          y: "10%",
          width: "85%",
          show: true
        },
        xAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#ddd"
            }
          }
        },
        yAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#ddd"
            }
          }
        },
        series: [
          {
            itemStyle: {
              normal: {
                color: "#63bbb2",
                opacity: 0.9
              }
            },
            name: "发送消息数",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: []
          },
          {
            itemStyle: {
              normal: {
                color: "#ef8989",
                opacity: 0.9
              }
            },
            name: "接收消息数",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },
            data: []
          }
        ]
      },
      phoneBrand_chartBar: {
        color: ["#20a0ff"],
        title: {
          text: "",
          subtext: "TOP 20"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            name: "注册用户数",
            type: "bar",
            data: []
          }
        ]
      },
      app_version: {
        title: {
          text: "",
          subtext: "android/ios各个版本(注册版本)",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "android",
            type: "pie",
            radius: [30, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            data: []
          },
          {
            name: "ios",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: []
          }
        ]
      },
      app_use_version: {
        title: {
          text: "",
          subtext: "android/ios各个版本(在用版本)",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          data: []
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "android",
            type: "pie",
            radius: [30, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            data: []
          },
          {
            name: "ios",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.totalUser()
    this.totalOrder()
    // 饼图占比
    this.pie.legend.data.push("Android")
    this.pie.legend.data.push("IOS")
    this.pie.series[0].data.push({'name': 'Android', 'value': 285})
    this.pie.series[0].data.push({'name': 'IOS', 'value': 691})

    // 饼图同心圆占比
    this.pie_radius.legend.data.push("Android")
    this.pie_radius.legend.data.push("IOS")
    this.pie_radius.series[0].data.push({'name': 'Android', 'value': 285})
    this.pie_radius.series[0].data.push({'name': 'IOS', 'value': 691})

    // 注册来源
    this.chartBar.yAxis.data.push('百度');
    this.chartBar.series[0].data.push('123456')
    this.chartBar.yAxis.data.push('谷歌');
    this.chartBar.series[0].data.push('110005')
    this.chartBar.yAxis.data.push('应用宝');
    this.chartBar.series[0].data.push('12587')

    // 消息推送
    this.queryWeChatMessage()
    // this.bar.title.text = '微信推送消息数 TOP 10'
    // this.bar.legend.data = ['发送消息数', '接收消息数']
    // for (let i = 5; i >= 0; i--) {
    //     let nickname = data[i]._id.nickname;
    //     let recv = data[i]._id.recv;
    //     let send = data[i]._id.send;
    //     this.bar.yAxis.data.push('张' + i);
    //     this.bar.series[0].data.push(send);
    //     this.bar.series[1].data.push(recv);
    // }
  },
  methods: {
    // 查询会员人数
    totalUser() {
      api.queryTotalUserByMock().then(res => {
        console.log(res)
        if (res.data.result == "00100000") {
          this.userTotal = res.data.data
        }
      })
    },
    // 查询订单数量
    totalOrder() {
      api.queryTotalOrderByMock().then(res => {
        console.log(res)
        if (res.data.result == "00100000") {
          this.orderTotal = res.data.data
        }
      })
    },
    // 查询微信消息推送数据
    queryWeChatMessage() {
      api.queryMessageByMock().then(res => {
        console.log(111, res)
        if (res.data.result == "00100000") {
          this.bar.title.text = res.data.data.title
          this.bar.legend.data = res.data.data.typeValue
          if (res.data.data.list) {
            res.data.data.list.forEach(el => {
              if (el) {
                this.bar.yAxis.data.push(el.nickname);
                this.bar.series[0].data.push(el.send);
                this.bar.series[1].data.push(el.recv);
              }
            })
          }
        }
      })
    },
    queryPie_radius() {},
    queryChartBar() {},
    queryBar() {},
    queryPhoneBrand_chartBar() {},
    queryPie_class() {},
    queryApp_version() {},
    queryApp_use_version() {}
  },
  filters: {
    // 格式化数字
    numFormat(num) {
      var num = (num || 0).toString(),
        result = "";
      while (num.length > 3) {
        result = "," + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
      }
      if (num) {
        result = num + result;
      }
      return result;
    }
  },
  components: {
    IEcharts
  }
};
</script>

<style lang="scss" scoped>
@import url('ionicons/dist/css/ionicons.min.css');

.echarts {
  float: left;
  width: 500px;
  height: 400px;
}
.info-box {
  cursor: pointer;
}
.info-box-content {
  text-align: center;
  vertical-align: middle;
  display: inherit;
  padding: 5px 10px;
  margin-left: 90px;
}
.progress-description, .info-box-text {
    display: block;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.info-box-text {
    text-transform: uppercase;
    color: black;
    text-align: center;
}
.info-box-number {
    display: block;
    font-weight: bold;
    font-size: 18px;
    color: black;
    text-align: center;
}
.c-charts {
  height: 500px;
  width: 100%;
}
.info-box {
  cursor: pointer;
}
.content {
  min-height: 100px;
}

// dashborder
.blu-container .main .blu-content-container {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}
.blu-container .main .blu-content-container .blu-content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
}

.toolbar {
  padding: 10px;
  margin: 10px 0;
  .content {
    padding: 15px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
  }
}

.info-box {
  display: block;
  min-height: 90px;
  background: #fff;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1);
  border-radius: 2px;
  margin-bottom: 15px;
  cursor: pointer;
  .info-box-icon {
    border-top-left-radius: 2px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 2px;
    display: block;
    float: left;
    height: 90px;
    width: 90px;
    text-align: center;
    font-size: 45px;
    line-height: 90px;
    background: rgba(0,0,0,0.2);
  }
}

.bg-olive {
  background-color: #3d9970 !important;
}
.bg-teal {
  background-color: #39cccc !important;
}
.bg-blue {
  background-color: #0073b7 !important;
}
.bg-light-blue, .label-primary, .modal-primary .modal-body {
  background-color: #3c8dbc !important;
}
.bg-yellow, .callout.callout-warning, .alert-warning, .label-warning, .modal-warning .modal-body {
  background-color: #f39c12 !important;
}
.bg-green, .callout.callout-success, .alert-success, .label-success, .modal-success .modal-body {
  background-color: #00a65a !important;
}
.bg-red, .callout.callout-danger, .alert-danger, .alert-error, .label-danger, .modal-danger .modal-body {
  background-color: #dd4b39 !important;
}
.bg-red, .bg-yellow, .bg-aqua, .bg-blue, .bg-light-blue, .bg-green, .bg-navy, .bg-teal, .bg-olive, .bg-lime, .bg-orange, .bg-fuchsia, .bg-purple, .bg-maroon, .bg-black, .bg-red-active, .bg-yellow-active, .bg-aqua-active, .bg-blue-active, .bg-light-blue-active, .bg-green-active, .bg-navy-active, .bg-teal-active, .bg-olive-active, .bg-lime-active, .bg-orange-active, .bg-fuchsia-active, .bg-purple-active, .bg-maroon-active, .bg-black-active, .callout.callout-danger, .callout.callout-warning, .callout.callout-info, .callout.callout-success, .alert-success, .alert-danger, .alert-error, .alert-warning, .alert-info, .label-danger, .label-info, .label-warning, .label-primary, .label-success, .modal-primary .modal-body, .modal-primary .modal-header, .modal-primary .modal-footer, .modal-warning .modal-body, .modal-warning .modal-header, .modal-warning .modal-footer, .modal-info .modal-body, .modal-info .modal-header, .modal-info .modal-footer, .modal-success .modal-body, .modal-success .modal-header, .modal-success .modal-footer, .modal-danger .modal-body, .modal-danger .modal-header, .modal-danger .modal-footer {
  color: #fff !important;
}

.bg-aqua, .callout.callout-info, .alert-info, .label-info, .modal-info .modal-body {
  background-color: #00c0ef !important;
}

// bootstrap 布局
.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9 {
  float: left;
}

.col-xs-12 {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9 {
    float: left;
  }
}

@media (min-width: 768px) {
  .col-sm-6 {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9 {
    float: left;
  }
}
@media (min-width: 992px) {
  .col-md-3 {
    width: 25%;
  }
}

</style>