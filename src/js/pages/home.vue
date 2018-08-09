<template>
  <div class="page-home">
    <h1>this is the home page 测试一下中文</h1>
    <tab></tab>
    <my-list></my-list>
    <item></item>
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
  comments:{'my-list': List, Item, Tab},
  mounted(){
    console.info('my home page lauched success', this)
  }
}
</script>