import store from '@/store'

let appId = store.state.appId
let tenant = store.state.tenant

const devConfig = {
  memberId: '',
  openId: '',
  // https环境
  baseUrl: 'https://daojia-test.hd123.com:9999',
  // 微信的appid
  wxAppid: 'wx9d2b7509cfe7fa90'
}
const productConfig = {
  memberId: '',
  openId: '',
  // https环境
  baseUrl: '',
  // 微信的appid
  wxAppid: ''
}

var config: any = devConfig
config.appId = appId
config.tenant = tenant

if (process.env.NODE_ENV === 'production') {
  config = productConfig
}
export default config
