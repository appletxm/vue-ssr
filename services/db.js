const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/test'

let db

function connectDb (url = DB_URL) {
  let promise
  
  promise = new Promise((resolve, reject) => {
    db = mongoose.connect(url, {useNewUrlParser: true}, (err) => {
      if (err) {
        reject(new Error('connect fialed.....'))
      }else {
        resolve(mongoose)
      }
    })
  })

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to ' + DB_URL)
  })
  mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected')
  })

  return promise
}

function closeDb(){
  console.info('=========closeDb=======')
  db.close()
}

module.exports = {connectDb, closeDb}
