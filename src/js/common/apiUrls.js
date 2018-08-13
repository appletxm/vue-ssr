const envCfg = require('env.cfg')
const API_URL = envCfg.api

export default {
  userLogin: API_URL + '/account/login',
  userRegister: API_URL + '/account/register',
  getCurrentUserInfo: API_URL + '/user/getCurrentUserInfo',
  listOrderInfo: API_URL + '/order/queryPageTradeOrder'
}
