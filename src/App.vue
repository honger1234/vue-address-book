<template>
  <div id="app">
    <HelloWorld></HelloWorld><!-- //使用组件 -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components:{
    HelloWorld  //映射组件
  }
}
</script>

<style>
</style>
