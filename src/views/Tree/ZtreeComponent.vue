<template>
  <div class="content_wrap">
    <div class="zTreeDemoBackground left">
      <ul id="treeDemo" class="ztree" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZTree',
  data() {
    return {
      inputValue: '',
      activeID: null,
      setting: {
        check: {
          enable: false, // checkbox
        },
        view: {
          selectedMulti: false,
          showIcon: false,
          nameIsHTML: true,
          dblClickExpand: false,
          showLine: false,
          fontCss: this.getFontCss,
          expandSpeed: 'fast',
          txtSelectedEnable: true,
          showTitle: true,
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
            children: 'children',
            name: 'title',
          },
          simpleData: {
            enable: true,
            idKey: 'id', // 树节点ID名称
            pIdKey: 'pId', // 父节点ID名称
          },
        },
      },
    };
  },
  watch: {
    zNodes: {
      handler() {
        $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
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
    expandNode(ID) {
      // 根据ID展开当前节点
      // 当前节点ID

      const treeObj = $.fn.zTree.getZTreeObj('treeDemo'); // 获取zTree根节点
      if (this.activeID && this.activeID !== ID) {
        // 清除上一次搜索选中的记录
        const lastNode = treeObj.getNodeByParam('id', this.activeID); // 根据ID获取子节点数据
        this.updateNodes(lastNode, false, treeObj);
      }
      const node = treeObj.getNodeByParam('id', ID); // 根据ID获取子节点数据
      const getParentNode = node.getParentNode(); // 根据子节点获取父节点
      treeObj.expandNode(getParentNode, true, false, true); // 需根据父节点ID进行展开
      this.updateNodes(node, true, treeObj);
      this.$emit('clickTreeNode', node);
      this.activeID = ID;
    },
    updateNodes(node, value, treeObj) {
      node.highlight = value; // 设置高亮属性
      treeObj.updateNode(node); // 更新当前节点
    },
    getFontCss(treeId, treeNode) {
      // 当前节点增加highlight：true 则高亮显示
      return treeNode.highlight
        ? {
          'font-weight': '500',
          background: '#E2EAF5',
        }
        : { background: '#FAFAFA', 'font-weight': 'normal' };
    },
    beforeClick(treeId, treeNode) {
      const treeObj = $.fn.zTree.getZTreeObj('treeDemo'); // 获取zTree根节点
      if (this.activeID && this.activeID !== treeNode.id) {
        // 清除上一次搜索选中的记录
        const lastNode = treeObj.getNodeByParam('id', this.activeID); // 根据ID获取子节点数据
        this.updateNodes(lastNode, false, treeObj);
      }
      // if (treeNode.isParent) {
      //   return true;
      // } else {
      //   this.$emit("clickTreeNode", treeNode);
      // }

      this.updateNodes(treeNode, true, treeObj);
      this.activeID = treeNode.id;

      this.$emit('clickTreeNode', treeNode);
    },
  },
  mounted() {
    window.zTree = this;
    $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);

    window.addEventListener('treeTriger', (event) => {
      this.expandNode(event.detail);
    });
  },
};
</script>
