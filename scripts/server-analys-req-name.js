function matchContentType (extName) {
  switch (extName) {
    case 'js':
      return 'application/x-javascript; charset=utf-8'
    case 'css':
      return 'text/css; charset=utf-8'
    case 'html':
      return 'text/html; charset=utf-8'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'woff':
      return 'application/font-woff'
    case 'woff2':
      return 'application/font-woff2'
    case 'ttf':
      return 'font/truetype'
    // case 'eot':
    //   return 'application/vnd.ms-fontobject'
    // case 'otf':
    //   return 'font/opentype'
    // case 'svg':
    //   return 'image/svg+xml'
    default:
      return 'text/plain; charset=utf-8'
  }
}

module.exports = (url) => {
  let name = url.match(/.+\.([^\.]+$)/)
  let fileName = url.match(/\/(.[^\/]+$)/)
  let obj = {}

  obj.extName = name[1] || ''
  obj.fileName = fileName[1] || ''
  obj.contentTyoe = matchContentType(obj.extName)

  return obj
}
