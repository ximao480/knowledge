<template>
  <div class="content_wrap">
    <div class="zTreeDemoBackground left">
      <ul
        id="treeDemo"
        class="ztree"
      />
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
          onExpand: this.handleExpand,
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
      treeObj: {},
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

      const { treeObj } = this; // 获取zTree根节点
      if (this.activeID && this.activeID !== ID) {
        // 清除上一次搜索选中的记录
        const lastNode = treeObj.getNodeByParam('id', this.activeID); // 根据ID获取子节点数据
        this.updateNodes(lastNode, false, treeObj);
      }
      const node = treeObj.getNodeByParam('id', ID); // 根据ID获取子节点数据
      if (node) {
        const getParentNode = node.getParentNode(); // 根据子节点获取父节点
        treeObj.expandNode(getParentNode, true, false, true); // 需根据父节点ID进行展开
        this.updateNodes(node, true, treeObj);
        this.$emit('clickTreeNode', node);
      }

      this.activeID = ID;
    },
    updateNodes(node, value, treeObj) {
      node.highlight = value; // 设置高亮属性
      treeObj.updateNode(node); // 更新当前节点
      this.setVideoIcon(node);
    },

    handleExpand(e, id, node) {
      this.setVideoIcon(node);
    },

    // 添加图标类
    addVideoIconClass(node) {
      this.$nextTick(() => {
        const iconDom = document.querySelector(`#${node.tId}_switch`);
        if (iconDom) {
          iconDom.classList.add('iconfont', 'iconshipin', 'video-icon');
          iconDom.onclick = () => {
            this.$emit('clickVideoIcon', node);
          };
        }
      });
    },

    // 设置视频图标
    setVideoIcon(currentNode) {
      if (currentNode.children.length > 0) {
        currentNode.children.forEach((childNode) => {
          if (childNode.children.length === 0 && childNode.videoOSSPath) {
            this.addVideoIconClass(childNode);
          }
        });
      }

      if (currentNode.children.length === 0 && currentNode.videoOSSPath) {
        this.addVideoIconClass(currentNode);
      }
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
      const { treeObj } = this; // 获取zTree根节点
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
      this.treeObj = $.fn.zTree.getZTreeObj('treeDemo');

      // 默认展开时，处理一下图标。因为默认的展开不会触发expand回调，需要手动改下图标
      const allNodes = this.treeObj.getNodes();
      allNodes.forEach((node) => {
        if (node.open) {
          this.setVideoIcon(node);
        }
      });

      this.expandNode(event.detail);
    });
  },
};
</script>

<style lang="less">
.ztree li span.button.video-icon {
  line-height: 30px;
}
</style>
