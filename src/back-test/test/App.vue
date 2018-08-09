// App.vue
<template>
    <div>
        <foo></foo>
        <bar></bar>
    </div>
</template>
<script>
    import Foo from './Foo.vue';
    import Bar from './Bar.vue';
    export default {
        components:{
            Foo,
            Bar
        }
    }
</script>