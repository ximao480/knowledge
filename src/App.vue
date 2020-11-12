<template>
  <div id="workbench" >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  components: {

  },
});
</script>
<style lang="less">
html,body{
  width: 100%;
  height: 100%;
}
#workbench {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  color: #2c3e50;
}
</style>
