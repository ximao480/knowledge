<template>
  <div class="content_wrap">

    <div class="zTreeDemoBackground left">
      <ul id="treeDemo" class="ztree" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ZTree",
  data() {
    return {
      inputValue: "",
      setting: {
        check: {
          enable: false, // checkbox
        },
        view: {
          selectedMulti: false,
          showIcon: true,
          nameIsHTML: true,
          dblClickExpand: false,
          showLine: false,
          fontCss: this.getFontCss
        },
        callback: {
          beforeClick: this.beforeClick,
        },
        edit: {
          enable: false,
          editNameSelectAll: false,
        },
        data: {
          key: {
            children: "children",
            name: "title",
          },
          simpleData: {
            enable: true,
            idKey: "id", // 树节点ID名称
            pIdKey: "pId", // 父节点ID名称

          },
        },
      },
    };
  },
  watch: {
    zNodes: {
      handler() {
        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
      },
      deep: true,
    },
  },

  props: {
    zNodes: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    expandNode(ID) {//根据ID展开当前节点
      //当前节点ID

      var treeObj = $.fn.zTree.getZTreeObj("treeDemo");//获取zTree根节点
      var node = treeObj.getNodeByParam("id", ID);//根据ID获取子节点数据
      const getParentNode = node.getParentNode();//根据子节点获取父节点
      treeObj.expandNode(getParentNode, true, false, true); //需根据父节点ID进行展开
      node.highlight = true;//设置高亮属性
      treeObj.updateNode(node);//更新当前节点
    },
     getFontCss(treeId, treeNode) {
       //当前节点增加highlight：true 则高亮显示
			return (!!treeNode.highlight) ? {'font-weight': '500', background:'rgb(240 247 253)',width:'100%'} : {color:"red", "font-weight":"normal"};
		 },
    beforeClick(treeId, treeNode) {
      if (treeNode.isParent) {
        return true;
      } else {
        this.$emit("clickTreeNode", treeNode);
      }
    },
  },
  mounted() {
    window.zTree=this
    $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
  },
};
</script>

<style lang="less" >
.content_wrap {
}
.highlight {
  font-size: 14px;
}
.cancelNode {
  background: transparent !important;
}
/* #areaTree{
        border:1px solid #e5e5e5;    margin-bottom: 2px;border-radius: 4px;overflow: scroll;width: 300px;
    }
    .box-title{
        border-radius: 3px 3px 0 0;background-color: #f5f5f5;
    }
    .box-title a{
        color: #2fa4e7;
        text-decoration: none;font-size:14px;    display: block;
        padding: 8px 15px;cursor: pointer;
    }
    .box-title .fa{
        float:right;line-height: 20px;
    } */
</style>
