<template>
  <div id="knowledge" class="knowledge" >
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from './views/Navigation';
import Vue from 'vue';
import infiniteScroll from "vue-infinite-scroll";

Vue.use(infiniteScroll)

export default {
  components: { navigation },
  created() {
  }
}
</script>
<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}
#knowledge {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  color: #2c3e50;
  overflow: hidden;
  background: white;
}
</style>
