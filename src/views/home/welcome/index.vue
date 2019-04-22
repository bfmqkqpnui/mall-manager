<template>
  <section class="toolbar">
    <section class="content">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-aqua"
            @click="statAll(0)"
          ><i class="ion ion-ios-people-outline"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">总用户数</span>
            <span class="info-box-number">{{ userTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-red"
            @click="statAll(1)"
          ><i class="ion ion-android-person-add"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">昨日新增用户</span>
            <span class="info-box-number">{{ yesterdayTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-green"
            @click="statAll(7)"
          ><i class="fa fa-bar-chart"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">最近7天新增</span>
            <span class="info-box-number">{{ weekTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-yellow"
            @click="statAll(30)"
          ><i class="fa fa-area-chart"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">最近30天新增</span>
            <span class="info-box-number">{{ monthTotal | numFormat }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-light-blue"
            @click="statAll(190)"
          ><i class="ion ion-ios-people-outline"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">近90天活跃</span>
            <span class="info-box-number">{{ threeMonthsActiveTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-blue"
            @click="statAll(11)"
          ><i class="ion-android-people"></i></span>

          <div class="info-box-content">
            <span class="info-box-text">昨日活跃用户</span>
            <span class="info-box-number">{{ yesterdayActiveTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-teal"
            @click="statAll(17)"
          ><i class="ion ion-arrow-graph-up-right"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">最近7天活跃</span>
            <span class="info-box-number">{{ weekActiveTotal | numFormat }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="info-box">
          <span
            class="info-box-icon bg-olive"
            @click="statAll(130)"
          ><i class="fa fa-industry"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">最近30天活跃</span>
            <span class="info-box-number">{{ monthActiveTotal | numFormat }}</span>
          </div>
        </div>
      </div>
    </section>
    <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
      >
        <el-card class="box-card">
          <div class="echarts">
            <IEcharts :option="pie"></IEcharts>
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
            <IEcharts :option="pie_radius"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p />
    <el-row :gutter="22">
      <el-col
        :xs="24"
        :sm="24"
        :md="12"
        :lg="12"
      >
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
    <el-row :gutter="20">
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
    <p />
    <el-row :gutter="20">
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
    </el-row>
    <p />
    <el-row :gutter="20">
      <el-col
        :xs="45"
        :sm="45"
        :md="24"
        :lg="24"
      >
        <el-card class="box-card">
          <div class="c-charts">
            <IEcharts :option="app_version"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p />
    <el-row :gutter="20">
      <el-col
        :xs="45"
        :sm="45"
        :md="24"
        :lg="24"
      >
        <el-card class="box-card">
          <div class="c-charts">
            <IEcharts :option="app_use_version"></IEcharts>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
</style>