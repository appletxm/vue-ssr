<template>
  <div class="page-login">
    <h1>this is the login page</h1>
    <list></list>
    <item></item>
  </div>
</template>

<script>
import List from 'components/list.vue'
import Item from 'components/item.vue'

export default {
  data () {
    return {
      
    }
  },
  computed: {},
  components:{List, Item},
  mounted(){
    console.info('my login page lauched success')
  }
}
</script>