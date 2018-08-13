let messager
let msgObj
let loadingObj

export default {
  createMessageObj(vue){
    messager = new vue()
  },

  showMsg(type, msg, duration) {
    msgObj = messager.$message({
      message: msg,
      showClose: true,
      type: type,
      duration: duration || 2000
    })
  },

  closeMsg() {
    msgObj.close()
  },

  showLoading() {
    loadingObj = messager.$loading({
      lock: true,
      spinner: 'el-icon-loading'
    })

    document.querySelector('.el-loading-mask.is-fullscreen').style.display = 'block'
  },

  closeLoading() {
    if (loadingObj) {
      loadingObj.close()
    }
  }
}
