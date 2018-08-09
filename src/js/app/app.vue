<template>
  <div class="my-app">
    <h1>My SSR app</h1>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    components: {}
  }
</script>
