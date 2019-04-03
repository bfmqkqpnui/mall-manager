// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts.vue'
import VueLazyLoad from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import '../static/font/aliFont.css'

import './base'

import utils from './utils'

//引入所有表 
require('echarts')

Vue.axios = Vue.prototype.axios = axios

Vue.config.productionTip = false
/**, { size: 'small', zIndex: 3000 } */
Vue.use(ElementUI)

// 注册组件
Vue.component('v-chart', ECharts)

Vue.use(VueLazyLoad,{
  error: './assets/icon_banner_loading.png',
  loading: './assets/icon_banner_loading.png'
})

/** 引入mock */
require('./mock')

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
