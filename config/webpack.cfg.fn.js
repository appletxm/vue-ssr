const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const autoprefixer = require('autoprefixer')

let envKeyWord = process.env.NODE_ENV
let isDevMode = envKeyWord === 'development' || envKeyWord === 'mock'

module.exports = {
  getRules() {},

  getClientHotCfg(cfg) {
    if (isDevMode === true) {
      // modify client config to work with hot middleware
      cfg.entry.app = ['webpack-hot-middleware/client?overlay=true', cfg.entry.app]
      cfg.output.filename = 'js/[name].js'
      cfg.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
      )
    }

    return cfg
  },

  getLessLoaderCfg(cfg){
    let lessLoader = {
      test: /\.less$/,
      use: [
        isDevMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'less-loader',
      ]
    }
    cfg.module.rules.push(lessLoader)

    return cfg
  },

  getCssMiniPlugin(cfg){
   let miniCssPlugin = new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDevMode ? 'style/[name].css' : 'style/[name].[contenthash].css',
      chunkFilename: isDevMode ? 'style/[id].css' : 'style/[id].[contenthash].css',
    })

    cfg.plugins.push(miniCssPlugin)

    return cfg
  },

  getAllRules(cfg){
    cfg.module.rules = [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: isDevMode ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
          outputPath: ''
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: isDevMode ? '[path][name].[ext]' : 'assets/fonts/[name].[ext]',
          outputPath: ''
        }
      }
    ]

    return cfg
  }
}
