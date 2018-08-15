const merge = require('webpack-merge')
const baseConfig = require('./webpack.cfg.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpackCfgFn = require('./webpack.cfg.fn')
const path = require('path')

let config = merge(baseConfig, {
  entry: {
    app: path.resolve('./src/js/entry-client.js')
    // vendor: ['element-ui', 'axios']
  },
  
  plugins: [
    new VueSSRClientPlugin()
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',

      cacheGroups: {
        commons: {
          test: /common|components|utils/,
          name: "commons",
          chunks: "all"
        },
        venders: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
})

config = webpackCfgFn.getClientHotCfg(config)

module.exports = config