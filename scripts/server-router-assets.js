const fs = require('fs')
const path = require('path')

module.exports = (req, res) => {
  let analyRes = serverAnalysReqName(req.url)
  let filePath = path.join(__dirname, '../dist', req.url)
  let file

  res.setHeader("Content-Type", analyRes.contentTyoe)
  try{
    file = fs.readFileSync(filePath, { encoding: 'utf-8'})
    res.end(file)
  }catch(err){
    res.status(404).end(`文件${filePath}找不到`)
  }
}