let UserModel

function createUserModel (mongoose) {
  let Schema
  let UserSchema

  if (!UserModel) {
    Schema = mongoose.Schema

    UserSchema = new Schema({
      userName: {type: String, index: true},
      userPwd: {type: String},
      userAge: {type: Number},
      logindate: { type: Date, default: Date.now}
    })

    UserModel = mongoose.model('User', UserSchema)
  }
}

function insert () {
  for (let i = 0; i < 5; i++) {
    new UserModel({
      userName: 'txm-' + i,
      userPwd: '123456',
      userAge: 35 + i,
      logindate: new Date()
    }).save((err) => {
      if (err) {
        console.err('txm-' + i + 'insert failed')
      }
    })
  }
}

function update () {
  UserModel.update({'username': 'Tracy McGrady'}, {'userpwd': 'zzzz'}, (err, res) => {
    if (err) {
      console.log('Error:' + err)
    } else {
      console.log('Res:' + JSON.stringify(res))
    }
  })
}

function updateForId () {
  UserModel.update({'userName': 'Tracy McGrady'}, {'userPwd': 'zzzz'}, (err, res) => {
    if (err) {
      console.log('Error:' + err)
    } else {
      console.log('Res:' + JSON.stringify(res))
    }
  })
}

function queryByCondition () {
  let wherestr = {'userName': /txm-1/, 'userAge': {$gte: 36, $lte: 65}}
  let opt = {'userName': 1, '_id': 1}

  UserModel.find(wherestr, opt, (err, res) => {
    if (err) {
      console.log('Error:' + err)
    }else {
      console.log('Res:' + JSON.stringify(res))
    }
  })
}

function queryAll () {
  return new Promise((resolve, reject) => {
    UserModel.find((err, res) => {
      if (err) {
        reject({code: '500', message: '系统错误'})
      } else {
        resolve({code: '200', data: res})
      }
    })
  })
}

function del () {
  let wherestr = {'userName': 'txm-2'}

  UserModel.remove(wherestr, (err, res) => {
    if (err) {
      console.log('Error:' + err)
    }else {
      console.log('Res:' + res)
    }
  })
}

function login(params) {
  let wherestr = {'userName': params.userName, 'userPwd': params.passWord}

  return new Promise((resolve, reject) => {
    UserModel.find(wherestr, (err, res) => {
      if (err) {
        reject({code: '500', message: '系统错误'})
      }else {
        if(res.length > 0) {
          resolve({code: '200', data: '18814184088a582d929-e824-4abc-862b-6952294c0379', userInfo: JSON.parse(JSON.stringify(res[0]))})
        } else {
          reject({code: '401', message: '你还不是我们的用户'})
        }
      }
    })
  })
}

function getCurrentUserInfo(params){
  let wherestr = {'_id': params.userId}

  return new Promise((resolve, reject) => {
    UserModel.find(wherestr, (err, res) => {
      if (err) {
        reject({code: '500', message: '找不到你要查找的用户信息'})
      }else {
        resolve({code: '200', data: res[0]})
      }
    })
  })
}

module.exports = {createUserModel, insert, update, queryByCondition, queryAll, login, getCurrentUserInfo}
