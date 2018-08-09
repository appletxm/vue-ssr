const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.cfg.base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')

module.exports = merge(baseConfig, {
  entry: path.resolve('./src/js/entry-server.js'),

  target: 'node',

  devtool: 'source-map',

  output: {
    filename: 'js/server.[chunkhash].js',
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    whitelist: [/\.css$/, /\.vue$/, /\.html$/, /\.less$/]
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
})