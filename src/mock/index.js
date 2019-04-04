// 引入mockjs
const Mock = require('mockjs')

// 获取 mock.Random 对象
const Random = Mock.Random

// mock一组职员列表数据
const resData = (params) => {
  console.log("查询职员列表入参：", params.body)
  let requestParams = JSON.parse(params.body)
  let empList = []
  for (let i = 0; i < requestParams.pageSize; i++) {
    empList.push(
      {
        id: Random.guid(),
        name: Random.cname(),
        addr: Random.county(true),
        age: Random.integer(18, 60),
        birth: Random.date(),
        sex: Random.integer(0, 1)
      })
  }

  let obj = {
    total: 245,
    list: empList
  }
  return {
    result: '1',
    msg: '',
    data: obj
  }
}


// 登录
const login = (params) => {
  console.log("登录入参：", params.body)
  let queryEmp = JSON.parse(params.body)
  let name = '管理员'
  let baseEmployeeData = []
  baseEmployeeData.push({
    id: 1,
    userName: 'admin',
    password: '123456',
    headUrl: Random.image('60x60', Random.color(), name.charAt(0))
  })
  for (let i = 0; i < 32; i++) {
    let userName = Random.cname()
    baseEmployeeData.push({
      id: i + 2,
      userName: userName,
      password: Random.integer(100000,999999),
      headUrl: Random.image('60x60', Random.color(), userName.charAt(0))
    })
  }
  // console.log("随机数据：", JSON.stringify(baseEmployeeData))
  let employee = {}
  let hasEmp = false
  for (let emp of baseEmployeeData) {
    console.log("遍历：", emp, emp.userName, queryEmp, params)
    if (emp.userName == queryEmp.userName && emp.password == queryEmp.password) {
      employee = emp
      employee.password = undefined
      hasEmp = true
      break
    }
  }
  console.log("登录结果：", hasEmp)
  if (hasEmp) {
    return {
      result: '1',
      msg: '',
      data: employee
    }
  } else {
    return {
      result: '-1',
      msg: '账号不存在或者密码错误',
      data: ''
    }
  }
}

// 生成订单
const orderList = (params) => {
  let param = JSON.parse(params.body)
  console.log("查询订单：", param.pageNum, param.pageSize, param.name)
  let orders = []
  let pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/
  for (let i = 0; i < param.pageSize; i++) {
    let time = Random.datetime('yyyyMMddHHmmss')
    orders.push(
      {
        orderId: time + Random.integer(10, 99),
        orderStatus: Random.integer(1, 7),
        orderType: Random.integer(1, 3),
        orderTime: time.replace(pattern, '$1-$2-$3 $4:$5:$6'),
        orderAmount: Number(Random.float(2, 1258, 2)).toFixed(2),
        orderRealAmount: Number(Random.float(2, 1258, 2)).toFixed(2)
    })
  }

  let data = {
    total: 1258,
    pageNum: param.pageNum,
    pageSize: param.pageSize,
    orderList: orders
  }
  return {
    result: '00100000',
    msg: '',
    data: data
  }
}

// Mock.mock( url, post/get , 返回的数据)
Mock.mock('/emp/queryAll', 'post', resData)
Mock.mock('/admin/login', 'post', login)
// 查询订单列表数据
Mock.mock('/order/queryAll', 'post', orderList)