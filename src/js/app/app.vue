<template>
  <div class="my-app">
    <navigator>
      <router-link to="/">home page</router-link>
      <router-link to="/login">login page</router-link>
    </navigator>
    
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
