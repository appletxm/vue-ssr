<template>
<div class="page-home">
  <!-- <h1>this is the home page 测试一下中文</h1>
  <tab></tab>
  <list></list>
  <item></item>
  <span class="el-icon-circle-plus"></span>
  <el-button @click="dialogVisible = !dialogVisible">不会自动关闭</el-button>
  <button @click="open3">点击按钮123456</button>

  <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog> -->

  <h1 class="user-info">
    name:{{userInfo.userName}} <br/> loginDate: {{userInfo.logindate}}
  </h1>

  <el-table :data="userList" style="width: 100%">
    <el-table-column v-for="(column, index) in columns" :key="index" :prop="column.field" :label="column.label">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import List from 'components/list.vue'
import Item from 'components/item.vue'
import Tab from 'components/tab.vue'
import models from 'models/models-page-home'
import apiUrls from 'common/api-urls'
import columns from 'models/columns-page-home'

export default {
  asyncData({
    store,
    route,
    userToken
  }) {
    if (!userToken) {
      // debugger
      // let promise = models.getUserList()
      // console.info(promise)
      // promise.then(res => {
      //    debugger
      //   return store.commit('setUserList', res.data)
      // }).cath(err => {
      //   return store.commit('setUserList', [])
      // })

      models.getUserList().then(res => {
        return store.commit('setUserList', res.data)
      }).catch(err => {
        return store.commit('setUserList', [])
      })

      return false
    } else {
      return ({
        storeCommitKey: 'setUserList',
        url: apiUrls.getUserList
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      columns,
      userInfo: {}
    }
  },
  computed: {
    userList() {
      return this.$store.state.userList
    }
  },
  components: {
    List,
    Item,
    Tab
  },
  watch: {
    'toggle' (val) {
      console.info('toggle:', val)
    },

    '$store.state.userList' (val) {
      console.info('########', val)
    }
  },
  methods: {
    open2() {
      alert('my test click')
    },

    open3() {
      alert('my test click 3')
    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted() {
    // console.info('my home page lauched success', this)
    this.userInfo = models.getUserInfo()
  }
}
</script>
