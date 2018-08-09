<template>
  <div class="component-tab">{{ a }} | {{ b }}</div>
</template>

<script>
export default {
  data() {
    return {
      a: 12345,
      b: 'ok'
    }
  },
  mounted() {
    console.info('init tab component======')
  }
}
</script>