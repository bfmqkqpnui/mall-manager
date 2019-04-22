import Vue from 'vue'

export default {
  queryAllMenuByMock: params => {
    return Vue.axios.post('/menu/queryAll', params)
  }
}