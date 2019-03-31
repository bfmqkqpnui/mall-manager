import Vue from 'vue'

export default {
  login: params => {
    return Vue.axios.post(Vue.$SERVICE_BASE_URL + '/admin/loginServlet', params)
  }
}