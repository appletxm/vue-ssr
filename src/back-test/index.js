const Koa = require('koa')
const http = require('http')
const path = require('path')
const fs = require('fs')
const server = new Koa()
const config = require('../config')
const vueServerRender = require('vue-server-renderer')

// const Vue = require('vue')
// const app = new Vue({
//   template: `<div><div>{{title}} : {{des}}</div><h1>Hello World</h1></div>`
// })
// let template = fs.readFileSync(path.resolve('./src/templates/index.html'), 'utf-8')
// console.info('====', template)
// const renderer = require('vue-server-renderer').createRenderer({
//   template
// })

let a = 1
let renderer = vueServerRender.createRenderer()

server.use(async (ctx, next) => {
  a += 1
  next(ctx)
})

server.use(async (ctx) => {
  // renderer.renderToString(app).then((err, html) => {
  //   console.log(html)
  //   ctx.body = html
  // }).catch(err => {
  //   console.error(err)
  // })

  // let data = {
  //   title: '我是标题',
  //   desc: '我是描述'
  // }

  // renderer.renderToString(app, data, (err, html) => {
  //   console.log('#############', html) // html 将是注入应用程序内容的完整页面
  //   ctx.body = html
  // })

  const createVueInstance = require('./common/create-vue-instance')
  const context = { url: ctx.request.url }
  const app = createVueInstance(context)

  renderer.renderToString(app, (err, html) => {
    ctx.res.end(html, 'utf8')
  })
})

http.createServer(server.callback()).listen(config.port, config.host, () => {
  console.info(`server start at http://${config.host}:${config.port}`)
})
// https.createServer(server.callback()).listen(3001);
