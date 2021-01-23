<template>
  <div id="knowledge" >
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import navigation from './views/Navigation';
import Vue from 'vue';
export default {
  components: { navigation },
  created() {
    Vue.mixin({
      created: function() {

          let Type = (function() {
              let Type = {};
              for (let i = 0, type; type = ['Undefined', 'Null', 'Boolean', 'Number', 'String', 'Function', 'Array', 'Object'][i++]; ) {
                  (function(type) {
                      Type['is' + type] = function(obj) {
                          return Object.prototype.toString.call(obj) === '[object ' + type + ']';
                      };
                  })(type);
              }
              return Type;
          })();

          this.$_live_type = Type;

          // use: this.$getChildComponent(vm, 'xx-xx')
          this.$_live_getChildComponent = function(vueInstance, componentTag) {
              let component = null;
              let allComp = getAllChildComp(vueInstance);

              let i = allComp.findIndex(function(vm) {
                  return vm.$options._componentTag === componentTag;
              });
              if (i !== -1) {
                  component = allComp[i];
              }
              return component;

              function getAllChildComp(instance) {

                  let allComp = [], child;
                  if (Type.isObject(instance)) {
                      child = instance.$children;
                  } else if (Type.isArray(instance)) {
                      child = instance;
                  }

                  for (let i = 0; i < child.length; i++) {
                      allComp.push(child[i]);
                      if (child[i].$children.length > 0) { // 还有孩子
                          allComp = allComp.concat(getAllChildComp(child[i].$children))
                      };
                  }
                  return allComp;
              }
          };
      }
  });
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
