<template>
<div class="page-home">
  <h1>this is the home page 测试一下中文</h1>
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
  </el-dialog>
</div>
</template>

<script>
import List from 'components/list.vue'
import Item from 'components/item.vue'
import Tab from 'components/tab.vue'

export default {
  asyncData({store,route}) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('getUserList')
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  computed: {},
  components: {
    List,
    Item,
    Tab
  },
  watch: {
    'toggle' (val) {
      console.info('=======', val)
    }
  },
  methods: {
    open2() {
      console.info('--------11----------')
      alert('4455555555444')
    },

    open3() {
      console.info('------------------')
      alert('88888')
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
  }
}
</script>
