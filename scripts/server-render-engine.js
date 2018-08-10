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

  res.setHeader('Content-Type', 'text/html')

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err, req, res)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

function createMyRender (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    basedir: resolve('../dist'),
    runInNewContext: false
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
