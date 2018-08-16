import axios from 'axios'
import apiUrls from 'common/api-urls'
import { storage } from 'common/storage'

export default {
  getUserList(params = {}) {
    return axios.get(apiUrls.getUserList, params)
  },

  getUserInfo(){
    return storage.getUserInfoFromStorage()
  }
}
