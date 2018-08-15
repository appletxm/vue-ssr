const user = require('../services/users')

module.exports = {
  getAllData(apiUrls, resolve) {
    let arry = []

    apiUrls.forEach((api) => {
      arry.push(this[api.url](api))
    })

    Promise.all(arry).then(() => {
      resolve(apiUrls)
    }).catch(() => {
      resolve(apiUrls)
    })
    
  },
  '/user/getUserList'(api) {
    return new Promise((resolve) => {
      user.connectDb().then((mongoose) => {
        user.createUserModel(mongoose)
        return user.queryAll()
      }).then(res => {
        api['data'] = res
        resolve(res)
      })
    })
  }
}
