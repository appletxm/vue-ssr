const path = require('path')
const fs = require('fs')
const LRU = require('lru-cache')
const setupDevServer = require('./server-hot')
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)
const templatePath = path.resolve(__dirname, '../src/index.html')

let template
let serverBundle
let clientManifest
let renderer
let promiseRender
let isProd
let jsFiles = [
  'assets/js-libs/es6-promise.min.js',
  'assets/js-libs/polyfill.min.js',
  'assets/js-libs/eventsource.min.js',
  // 'assets/js-libs/vue.min.js',
  // 'assets/js-libs/vuex.min.js',
  // 'assets/js-libs/vue-router.min.js',
  'assets/js-libs/moment.min.js',
  'assets/js-libs/lodash.min.js'
]

function decorateHtml(html){
  let jsHtml = []
  let splitHtml

  html = html.replace(/<[^<>]+iconfont\.css"\s*>/, '')
  html = html.replace(/<[^<>]+demo\.css"\s*>/, '')

  jsFiles.forEach(file => {
    jsHtml.push('<script src="/dist/' + file + '"></script>')
  })

  splitHtml = html.split('<body>')

  html = splitHtml[0] + '<body>' + jsHtml.join('') + splitHtml[1]
  
  return html
}

function handleError (err, req, res) {
  if (err.url) {
    res.redirect(err.url)
  } else if (err.code === 404) {
    res.status(404).send('404 | Page Not Found')
  } else {
    // Render Error Page or Redirect
    res.status(500).send('500 | Internal Server Error')
    console.error(`error during render : ${req.url}`)
    console.error(err.stack)
  }
}

function render (req, res) {
  const s = Date.now()
  const context = {
    title: 'Vue HN 2.0', // default title
    url: req.url
  }

  res.setHeader('Content-Type', 'text/html; charset=UTF-8')

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err, req, res)
    }

    html = decorateHtml(html)

    res.send(html)

    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

function shouldPreload(file, type){
  // console.info('preload file: ', file, type)

  // if (type === 'script' || type === 'style') {
  //   return true
  // }
  // if (type === 'font') {
  //   // 只预加载 woff2 字体
  //   return /\.woff2$/.test(file)
  // }
  // if (type === 'image') {
  //   // 只预加载重要 images
  //   return file === 'hero.jpg'
  // }

  return false
}

function shouldPrefetch(file, type){
  // console.info('prefecth file: ', file, type)
  // if(isProd === true){
  //   if(type === 'script') {
  //     return file.indexOf('.min.') >= 0
  //   }
  // } else {
  //   if(type === 'script') {
  //     return file.indexOf('.min.') < 0
  //   }
  // }

  return false
}

function createMyRender (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),

    basedir: resolve('../dist'),

    runInNewContext: false,

    shouldPreload: shouldPreload,

    shouldPrefetch: shouldPrefetch
  }))
}

function initRender (app) {
  isProd = process.env.NODE_ENV === 'production'

  if (isProd === true) {
    template = fs.readFileSync(templatePath, 'utf-8')
    serverBundle = require('../dist/vue-ssr-server-bundle.json')
    clientManifest = require('../dist/vue-ssr-client-manifest.json')

    renderer = createMyRender(serverBundle, {template, clientManifest})
  } else {
    promiseRender = setupDevServer(app, templatePath, (serverBundle, options) => {
      renderer = createMyRender(serverBundle, options)
    })
  }
}

module.exports = (app) => {
  initRender(app)

  return function (req, res) {
    if (isProd === true) {
      render(req, res)
    } else {
      promiseRender.then(() => render(req, res))
    }
  }
}
