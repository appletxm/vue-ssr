<template>
  <div class="page-home">
    <h1>this is the home page</h1>
    <list></list>
    <item></item>
  </div>
</template>

<script>
import List from '../components/list.vue'
import Item from '../components/item.vue'
import Tab from '../components/tab.vue'

export default {
  data () {
    return {}
  },
  computed: {},
  comments:{List, Item, Tab}
}
</script>