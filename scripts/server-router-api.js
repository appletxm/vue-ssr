const fs = require('fs')
// const path = require('path')
const user = require('../services/users')

const handlers = {
  '_account_login'(req, res){
    let params = req.body

    user.connectDb().then((mongoose) => {
      user.createUserModel(mongoose)
      return user.login(params)
    }).then(result => {
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  },

  '_user_getCurrentUserInfo'(req, res) {
    let params = req.query

    user.connectDb().then((mongoose) => {
      user.createUserModel(mongoose)
      return user.getCurrentUserInfo(params)
    }).then(result => {
      res.end(JSON.stringify(result))
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  },

  '_user_getUserList'(req, res){
    user.connectDb().then((mongoose) => {
      user.createUserModel(mongoose)
      return user.queryAll()
    }).then(result => {
      let str = JSON.stringify(result)
      res.end(str)
    }).catch(err => {
      res.end(JSON.stringify(err))
    })
  }
}

module.exports = (req, res) => {
  // let filePath = path.join(__dirname, '../mocks', req.originalUrl + '.json')
  // let file

  res.setHeader("Content-Type", 'application/json; charset=utf-8')

  // try{
  //   file = fs.readFileSync(filePath, { encoding: 'utf-8'})
  //   res.end(file)
  // }catch(err){
  //   res.status(404).end(`文件${filePath}找不到`)
  // }

  let fnName = req.path.replace(/\//g, '_')

  handlers[fnName](req, res)
}