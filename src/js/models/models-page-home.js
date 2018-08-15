import axios from 'axios'
import apiUrls from 'common/api-urls'

export default {
  getUserList(params = {}) {
    return axios.get(apiUrls.getUserList, params)
  }
}
