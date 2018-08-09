const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')

let envKeyWord = 'development'

module.exports = {
  mode: envKeyWord,
  entry: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
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
          name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/images/[name].[ext]',
          outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/images/',
          publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '../' : '../'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          context: 'client',
          name: (envKeyWord === 'development' || envKeyWord === 'mock') ? '[path][name].[ext]' : 'assets/fonts/[name].[hash:7].[ext]',
          outputPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '' : 'assets/fonts/',
          publicPath: (envKeyWord === 'development' || envKeyWord === 'mock') ? '../' : '../'
        }
      },

      {
        test: /\.(le|c)ss$/,
        use: [
          envKeyWord === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.less', '.css', '.html', '.json'],
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      'vue': 'vue/dist/vue.min.js',
      'env.cfg': '',
      'pages': path.join(__dirname, '../src/js/pages/'),
      'components': path.join(__dirname, '../src/js/components/'),
      'assets': path.join(__dirname, '../src/assets/'),
      'common': path.join(__dirname, '../src/js/common/'),
      'store': path.join(__dirname, '../src/js/store/'),
      'router': path.join(__dirname, '../src/js/router/')
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
