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
  return new Promise((resolve) => {
    UserModel.find((err, res) => {
      if (err) {
        resolve([])
      }else {
        resolve(res)
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

module.exports = {createUserModel, insert, update, queryByCondition, queryAll}
