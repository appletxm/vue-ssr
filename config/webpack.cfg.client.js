const merge = require('webpack-merge')
const baseConfig = require('./webpack.cfg.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const autoprefixer = require('autoprefixer')

module.exports = merge(baseConfig, {
  entry: {
    app: path.resolve('./src/js/entry-client.js'),
    vendor: ['vue']
  },
  
  plugins: [
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
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