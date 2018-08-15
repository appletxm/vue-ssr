
const express = require('express')
const path = require('path')
const app = express()
const envCfg = require('../config/en.cfg.development.js')
const renderEngine = require('./server-render-engine')(app)
const assetsRouter = require('./server-router-assets')
const apiRouter = require('./server-router-api')
const cookieParser = require('cookie-parser')
const serverInfo = `express/${require('express/package.json').version} ` + `vue-server-renderer/${require('vue-server-renderer/package.json').version}`

console.info('****current env is ',process.env.NODE_ENV, '****')

app.use('*', cookieParser())

app.use(express.static(path.join(__dirname, '../dist')))

app.use('*', (req, res, next) =>{
  console.info('[' + (req.method).toUpperCase() + ']', req.originalUrl)
  res.setHeader("Server", serverInfo)
  !next || next()
})

app.use('/dist', assetsRouter)

app.use('/api', apiRouter)

app.use('/', renderEngine)

app.listen(envCfg.port, envCfg.host, () => {
  console.info(`server start at http://${envCfg.host}:${envCfg.port}`)
})
