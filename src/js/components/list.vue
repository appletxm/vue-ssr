<template>
  <ul>
    <li v-for="(item, index) in list" v-bind:key="index">itme: {{a}}</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
            a: 11111
          },
          {
            a: 22222
          }
        ]
      }
    },
    mounted() {
      console.info('init list component--------------')
    }
  }

</script>
