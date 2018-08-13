import { checkIsMacRetina } from './uiUtils'

export default function uiAdapt (win, doc, uxWidth, reallyNeedAdapt) {
  var docEl,
    rem,
    dpr,
    resizeEvt,
    recalc

  uxWidth = uxWidth || 750
  docEl = doc.documentElement
  dpr = win.devicePixelRatio || 1
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  recalc = function () {
    var clientWidth = docEl.clientWidth * dpr
    var isMacRetina = false

    if (!clientWidth) return

    // TODO if content will be removed if the mobile UI is ok
    isMacRetina = checkIsMacRetina()
    if (reallyNeedAdapt === true) {
      if (isMacRetina) {
        rem = 100
      } else if (dpr > 1) {
        rem = 180
      }
    } else {
      if (clientWidth >= uxWidth) {
        rem = 100
      } else {
        rem = 100 * (clientWidth / uxWidth)
      }
    }

    docEl.style.fontSize = rem + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  // 给js调用的，某一dpr下rem和px之间的转换函数
  win.rem2px = function (v) {
    v = parseFloat(v)
    return v * rem
  }
  win.px2rem = function (v) {
    v = parseFloat(v)
    return v / rem
  }
  window.dpr = dpr
  window.rem = rem
}
