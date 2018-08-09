
const express = require('express')
const envCfg = require('../config/en.cfg.development.js')
const renderEngine = require('./server-render-engine')
const assetsRouter = require('./server-assets-router')

const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
const isProd = process.env.NODE_ENV === 'production'
const app = express()

app.use('*', (req, res, next) =>{
  console.info('[' + (req.method).toUpperCase() + ']', req.originalUrl)
  res.setHeader("Server", serverInfo)
  !next || next()
})

app.use('/dist', assetsRouter)

app.use('/', renderEngine)

app.listen(envCfg.port, envCfg.host, () => {
  console.info(`server start at http://${envCfg.host}:${envCfg.port}`)
})
