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
  import { fuzzySearch } from '../../../static/js/ztree/fuzzysearch';
  export default {
    name: 'ZTree',
    data() {
      return {
        inputValue: '',
        setting: {
          check: {
            enable: false// checkbox
          },
          view: {
            selectedMulti: false,
            showIcon: true,
            nameIsHTML: true,
            dblClickExpand: false,
            showLine: false,
          },
          callback: {
            beforeClick: this.beforeClick,
          },
          edit: {
            enable: false,
            editNameSelectAll: false
          },
          data: {
            key: {
              children: 'children',
              name: 'title',
            },
            simpleData: {
              enable: true,
              idKey: 'ID', // 树节点ID名称
              pIdKey: 'PARENT_ID', // 父节点ID名称
            }
          },
        },
      };
    },
    watch: {
      zNodes: {
        handler() {
          $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
        },
        deep: true
      },
    },

    props: {
      zNodes: {
        type: Array,
        default: () => []
      },
    },
    methods: {
      beforeClick(treeId, treeNode) {
			if (treeNode.isParent) {
				return true;
			} else {
         this.$emit('clickTreeNode',treeNode);
			}
		},
    },
    mounted() {
      $.fn.zTree.init($('#treeDemo'), this.setting, this.zNodes);
    }
  };
</script>

<style lang="less" >
.content_wrap{

}
.highlight{
font-size: 14px;
}
.cancelNode{
  background:transparent !important;
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
