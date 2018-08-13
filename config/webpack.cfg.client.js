const merge = require('webpack-merge')
const baseConfig = require('./webpack.cfg.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackCfgFn = require('./webpack.cfg.fn')
const path = require('path')

let config = merge(baseConfig, {
  entry: {
    app: path.resolve('./src/js/entry-client.js'),
    vendor: ['element-ui', 'axios']
  },
  
  plugins: [
    new VueSSRClientPlugin()
  ],

  optimization: {
    splitChunks: {
      name: 'vender', 
      filename: '[name].[chunkhash].js',
      minChunks: 2
    }
  }
})

config = webpackCfgFn.getClientHotCfg(config)

module.exports = config