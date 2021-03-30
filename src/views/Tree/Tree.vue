<template>
  <div class="mdTree">
    <!-- <div class="header">
      <div>
        <img class="listicon" :src="img" />
        <span>R3框架</span>
      </div>

      <div class="directory"></div>
    </div> -->
    <div class="TreeContent">
      <treeMD ref="zTree" :z-nodes="treeDatas" @clickTreeNode="selectedTree" @clickVideoIcon="clickVideoIcon"/>
    </div>
  </div>
</template>
<script>
import treeMD from './ZtreeComponent.vue';

export default {
  components: {
    treeMD,
  },
  data() {
    return {
      // img: require('../../assets/img/list.png').default,
    };
  },
  props: {
    treeDatas: {
      type: Array,
    },
  },
  methods: {
    selectedTree(selected) {
      // 处理点击输查询接口逻辑
      // selected：当前点击节点数据
      this.$emit('selectedTree', selected);
    },

    clickVideoIcon(e) {
      this.$emit('clickVideoIcon', e);
    },
  },
};
</script>
<style lang="less" scoped>

</style>
