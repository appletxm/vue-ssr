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
    case 'gif':
      return 'image/gif'
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
