<template>
  <ul>
    <li v-for="(item, index) in list" v-bind:key="index">itme: {{item.a}}</li>
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
    mounted() {}
  }

</script>
