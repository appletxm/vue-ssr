const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require('copy-webpack-plugin')
const envCfg = require('./en.cfg.development')
const webpackCfgFn = require('./webpack.cfg.fn')

let config = {
  mode: process.env.NODE_ENV,
  entry: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: envCfg.publicPath,
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: []
  },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css', '.html', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      'vue': 'vue/dist/vue.min.js',
      'env.cfg': path.join(__dirname, '../config/en.cfg.development.js'),
      'pages': path.join(__dirname, '../src/js/pages/'),
      'components': path.join(__dirname, '../src/js/components/'),
      'assets': path.join(__dirname, '../src/assets/'),
      'common': path.join(__dirname, '../src/js/common/'),
      'utils': path.join(__dirname, '../src/js/utils/'),
      'store': path.join(__dirname, '../src/js/store/'),
      'router': path.join(__dirname, '../src/js/router/'),
      'models': path.join(__dirname, '../src/js/models/')
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([{ from: path.join(__dirname, '../src/assets'), to: path.join(__dirname, '../dist/assets') }])
  ]
}

config = webpackCfgFn.getAllRules(config)
config = webpackCfgFn.getLessLoaderCfg(config)
config = webpackCfgFn.getCssMiniPlugin(config)

module.exports = config
