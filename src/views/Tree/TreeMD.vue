<template>
  <div>
    <Ztree
      ref="zTree"
      :z-nodes="treeData"
      :placeholder="placeholder"
      @clickTreeNode="clickTreeNode"
    />
  </div>
</template>
<script>
  import Ztree from './ZtreeComponent.vue';

  export default {
    data() {
      return {
        placeholder: '',
        treeNodeID: null, // 当前点击的节点ID
        Ids: [],
        resArr: [],
        currentClickNoded: [],
        inputValue: '',
        menuTreeQuery: '', // 菜单树检索的值
        oldMenuTreeObj: null, // 上一次选中的菜单节点的数据
        newMenuTreeObj: null, // 当前选中的菜单节点的数据
        treeData: [
          // {
          //   title: 'parent 1',
          //   expand: false,
          //   children: [
          //     {
          //       title: 'parent 1-1',
          //       expand: false,
          //       children: [
          //         {
          //           title: 'leaf 1-1-1'
          //         },
          //         {
          //           title: 'leaf 1-1-2'
          //         }
          //       ]
          //     },
          //     {
          //       title: 'parent 1-2',
          //       expand: false,
          //       children: [
          //         {
          //           title: 'leaf 1-2-1'
          //         },
          //         {
          //           title: 'leaf 1-2-1'
          //         }
          //       ]
          //     }
          //   ]
          // }
        ]
      };
    },
    components: {
      Ztree
    },
    created() {
      // document.onkeydown = (e) => {
      //   const key = e.keyCode;
      //   if (key === 13) {
      //     this.searchClick(e, this.menuTreeQuery);
      //   }
      // };
    },
    props: {
      treeDatas: {
        type: Object,
        default: () => {}
      },
    },
    watch: {
      treeDatas: {
        handler(val) {
          this.getTreeInfo();
        }
      },
    },
    mounted() {
      this.getTreeInfo();
    },
    methods: {
      //  this.$emit('menuTreeChange', this.Ids, this.treeName, treeNodeID, flag);
      // 参数说明
      // this.Ids: 当前选中节点的ID以及全部子ID type:Array
      // treeNodeID：当前点击节点ID
      // flag:true:查询选中的节点，false:查询空

      getTreeInfo() { // 获取树信息
        if (this.treeDatas !== null) {
          this.treeData = this.treeDatas.data;
          this.placeholder = this.treeDatas.placeholder;
        }
      },
      callMethod() {
        this.$refs.zTree.callMethod();
      },
      callBackFunction(tdata, resData) {
        if (Array.isArray(tdata) && tdata.length > 0) {
          tdata.forEach((v, i) => {
            if (v.ID) {
              this.Ids.push(v.ID);
            }
            const arr = [];
            this.callBackFunction(v.CHILDREN, arr);
            if (resData[i] && resData[i].CHILDREN) {
              resData[i].CHILDREN = arr;
            }
          });
        }
      },
      clickTreeNode(treeNodeID, flag) {//点击树节点
         this.$emit('selectedTree',treeNodeID);
        // 参数说明
        // treeNodeID：当前点击节点ID
      },
      searchInputChange(e) {
        this.menuTreeQuery = e.target.value;
      }, // 检索输入框值改变
    }
  };
</script>
