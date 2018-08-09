const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')

const template = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})

module.exports = (req, res) => {
  renderer.renderToString({url: req.url}, (err, html) => {
    if (err) {
      console.error(err)
      res.status(500).end('服务器内部错误')
      return
    }
    res.end(html)
  })
}