<template>
  <div class="mdTree">
    <div class="header">
      <i
        class="iconfont iconios-list"
        title="设置"
      />
      <span> 技术列表</span>
      <p class="directory">
        目录
      </p>
    </div>
    <div class="TreeContent">
        <treeMD
            ref="zTree"
      :z-nodes="treeDatas"
      @clickTreeNode="selectedTree"
        />

    </div>
  </div>
</template>
<script>
  import jsonData from '../../../static/js/ztree/treeData.json';
  import treeMD from './ZtreeComponent.vue';

  export default {
    components: {
      treeMD
    },
    data() {
      return {

      };
    },
    props:{
      treeDatas: {
        type: Array,
        // default: () => ({
        //   data: jsonData.data, // 树结构列表数据
        // })
      },
    },
    methods:{
      selectedTree(selected){//处理点击输查询接口逻辑
         // selected：当前点击节点数据
        this.$emit('selectedTree',selected);

      }
    },
  };
</script>
<style lang="less" scoped>
.mdTree{
  color: rgba(0,0,0,0.8);
  width:240px;
  border-right:1px solid rgb(237,237,238);
  height: 100%;
    overflow: scroll;
  .header{
    height: 88px;
    line-height: 60px;
    font-size: 16px;
    font-weight: bold;
    padding-left: 18px;
    overflow: hidden;
    .iconios-list{
      color: rgb(55,141,247);
    }
        .iconmd-person{
          color: rgb(55,138,247);
        }
      .directory{
            font-size: 14px;
            color: rgb(172,176,180);
            height: 24px;
            line-height: 14px;
      }
  }

  .TreeContent{
    padding:0 10px 0 10px;
  }
}
</style>
