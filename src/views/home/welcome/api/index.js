import Vue from 'vue'

export default {
  queryTotalUserByMock: () => {
    return Vue.axios.post("/member/queryTotal")
  },
  queryTotalOrderByMock: () => {
    return Vue.axios.post("/order/queryTotal")
  },
  queryMessageByMock: () => {
    return Vue.axios.post("/message/queryTotal")
  }
}