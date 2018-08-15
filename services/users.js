const db = require('./db')
const user = require('./model-user')

// db.connectDb().then((res) => {
//   mongoose = res
//   user.createUserModel(mongoose)
//   // user.insert()
//   // user.update()
//   // user.queryByCondition()
//    user.queryAll().then(res => {
//      console.info('======get all======', res)
//    })
// }).catch(err => {
//   console.error(err)
// })

module.exports = {...db, ...user}

