const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
  let filePath = path.join(__dirname, '../mocks', req.originalUrl + '.json')
  let file

  res.setHeader("Content-Type", 'application/json; charset=utf-8')

  try{
    file = fs.readFileSync(filePath, { encoding: 'utf-8'})
    res.end(file)
  }catch(err){
    res.status(404).end(`文件${filePath}找不到`)
  }
}