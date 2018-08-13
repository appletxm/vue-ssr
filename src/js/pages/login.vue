<template>
<div class="page-login" v-loading="isLoading">
  <section class="inner">
    <dl>
      <dt>请输入用户名</dt>
      <dd><input type="text" maxlength="16" v-model="userName" /></dd>
    </dl>
    <dl>
      <dt>请输入密码</dt>
      <dd><input type="password" maxlength="16" v-model="password" /></dd>
    </dl>

    <p class="footer">
      <el-button type="primary" @click="doLogin">登录</el-button>
    </p>
  </section>

</div>
</template>

<script>
import models from 'models/models-page-login'
import message from 'common/messager'

export default {
  data() {
    return {
      isLoading: false,
      userName: '',
      password: ''
    }
  },
  computed: {},
  components: {},
  methods: {
    doLogin() {
      let params = {
        userName: this.userName,
        password: this.password
      }

      if (!this.userName || !this.password) {
        message.showMsg('warning', '请输入正确的用户名跟密码')
      } else {
        this.isLoading = true
        models.doLogin(params).then(res => {
          if(res.code === '200'){
            models.setTokenToCookie(res)
            return models.getCurrentUserInfo()
          } else {
            this.loginFail(err)
          }
        }).then(res => {
          if(res.code === '200'){
            models.setUserInfoToStorage(res)
            this.$router.push({path: '/'})
          } else {
            this.loginFail(err)
          }
        }).catch(err => {
          this.loginFail(err)
        })
      }
    },

    loginFail(err){
      this.isLoading = false

      message.showMsg('error', err.errorMessage)
      console.info('[doLogin error]', err)
    }
  },
  mounted() {
    // console.info('my login page lauched success')
  }
}
</script>
