import Vue from 'vue'

export default {
  queryAllByPage: params => {
    return Vue.axios.post(Vue.$SERVICE_BASE_URL + '/admin/loginServlet', params)
  },
  queryAllByMock: params => {
    return Vue.axios.post('/order/queryAll', params)
  }
}