import axios from 'axios'
import apiUrls from 'common/api-urls'
import auth from 'common/auth'
import axioDecorate from 'common/axio-decorate'
import { storage } from 'common/storage'

export default {
  doLogin(params) {
    return axios.post(apiUrls.userLogin, params)
  },

  setTokenToCookie(res) {
    auth.setTokenToCookie(res.data)
    axioDecorate.setHttpHeaderCookie()
  },

  getCurrentUserInfo(params) {
    return axios.get(apiUrls.getCurrentUserInfo, {params: params})
  },

  setUserInfoToStorage(data) {
    storage.setUserInfoToStorage(data)
  }
}
