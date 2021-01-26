<template>
  <div class="mdTree">
    <div class="header">
      <div>
        <i class="iconfont iconbianzu" title="设置" />
        <span>R3框架</span>
      </div>

      <div class="directory"></div>
    </div>
    <div class="TreeContent">
      <treeMD ref="zTree" :z-nodes="treeDatas" @clickTreeNode="selectedTree" />
    </div>
  </div>
</template>
<script>
import treeMD from "./ZtreeComponent.vue";

export default {
  components: {
    treeMD,
  },
  data() {
    return {};
  },
  props: {
    treeDatas: {
      type: Array,
    },
  },
  methods: {
    selectedTree(selected) {
      //处理点击输查询接口逻辑
      // selected：当前点击节点数据
      this.$emit("selectedTree", selected);
    },
  },
};
</script>
<style lang="less" scoped>
.mdTree {

  color: rgba(0, 0, 0, 0.8);
  width: 240px;
  border-right: 1px solid rgb(237, 237, 238);
  height: 100%;
  overflow: auto;
  background: #fafafa;
  .header {
    height: 86px;
    font-size: 18px;
    font-weight: bold;
    padding-left: 25px;
    display: flex;
    flex-direction: column;
    padding: 24px 0 0 25px;
    span {
      margin-left: 10px;
    }
    .iconios-list {
      background: rgb(55, 141, 247);
    }
    // .iconmd-person {
    //   color: rgb(55, 138, 247);
    // }
    .directory {
      background: rgb(172, 176, 180);
      width: 21px;
      height: 1px;
      margin-top: 22px;
    }
  }

  .TreeContent {
    // padding: 0 10px 0 10px;
  }
}
</style>
