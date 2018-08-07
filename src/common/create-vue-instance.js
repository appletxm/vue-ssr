// app.js
const Vue = require('vue')
const fs = require('fs')
const path = require('path')

let template = fs.readFileSync(path.resolve('./src/templates/index.html'), 'utf-8')

module.exports = function createApp (context) {
  return new Vue({
    data: {
      url: context.url
    },
    // template: `<div>访问的 URL 是： {{ url }}</div>`
    template
  })
}