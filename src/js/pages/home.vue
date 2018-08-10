<template>
  <div class="page-home">
    <h1>this is the home page 测试一下中文</h1>
    <tab></tab>
    <list></list>
    <item></item>
    <span class="el-icon-circle-plus"></span>
    <el-button @click="open2">不会自动关闭</el-button>
    <button @click="open3">点击按钮</button>
  </div>
</template>

<script>
import List from 'components/list.vue'
import Item from 'components/item.vue'
import Tab from 'components/tab.vue'

export default {
  data () {
    return {}
  },
  computed: {},
  components:{List, Item, Tab},
  methods: {
    open2(){
      alert('4455555555444')
    },

    open3(){
      alert('88888')
    }
  },
  mounted(){
    console.info('my home page lauched success', this)
  }
}
</script>