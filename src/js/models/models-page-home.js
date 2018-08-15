import axios from 'axios'
import apiUrls from 'common/api-urls'

export default {
  getUserList(params = {}) {
    console.info('======6666666=======', apiUrls.getUserList)
    return axios.get(apiUrls.getUserList, params)
  }
}
