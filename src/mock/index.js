// 引入mockjs
const Mock = require('mockjs')

// 获取 mock.Random 对象
const Random = Mock.Random

// mock一组数据
const resData = () => {
  let obj = {}
  return {
    resCode: '00100000',
    msg: '',
    obj: obj
  }
}

// Mock.mock( url, post/get , 返回的数据)
Mock.mock('/test/index', 'post', resData)