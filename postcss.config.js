module.exports = {
  plugins: [
    require('autoprefixer')({
        'browsers': ['> 1%', 'last 2 versions', 'Firefox > 20']
    })
  ]
}