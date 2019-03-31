let u = navigator.userAgent
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端

let APP_ID = ''
const SERVICE_BASE_URL = '/h5_api' // '/h5_api' // '/h5_gateway'

switch (location.host) {
  case '10.199.5.19:8899': // 测试环境
  case 'localhost:8899': // 测试环境
    break;
  default: // 生产环境
}

export default {
  SERVICE_BASE_URL, // 接口base地址
}
