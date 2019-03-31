import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/notFound/404.vue'

Vue.use(Router)

const baseRoute = [
  {
    path: '/',
    redirect: '/login'
  }
]

const notFoundRoute = [
  {
    path: '*',
    meta: {
      notLoading: true,
      title: '404',
    },
    component: NotFound
  }
]
export default new Router({
  mode: 'history',
  // base: '/h5/',
  routes: (r => {
    let route = []
    r.keys().forEach(key => {
      let arr = r(key).default
      if (Array.isArray(arr)) {
        for (let tempData of arr) {
          route.push(tempData)
        }
      } else {
        route.push(arr)
      }
    })
    if (process.env.NODE_ENV !== 'production') {
      let routeDatas = [...baseRoute, ...route, ...notFoundRoute]
      let tempArr = []
      for (let item of routeDatas) {
        tempArr.push({
          path: item.path,
          title: (item.meta && item.meta.title) ? item.meta.title : '无title'
        })
      }
      console.log('/* 路由表 */')
      console.table(tempArr)
    }
    return [...baseRoute, ...route, ...notFoundRoute]
  })(require.context('../views', true, /^\.\/((?!\/)[\s\S])+\/route\.js$/))
})
