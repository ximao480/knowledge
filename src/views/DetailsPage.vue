<template>
  <div class="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
     <tree @selectedTree='selectedTree' :treeDatas="treeDatas"></tree>
      <div class="flex-box-resizer">
      </div>
    </div>
    <!-- 详情 -->
    <div class="details">
      <document :detail="documentation"></document>
    </div>
  </div>
</template>
<script>
import tree from './Tree/Tree'
import document from '../components/document';
import { getDirectory, getDocumentation } from '../utils/api';

export default {
  components:{
    tree,
    document
  },
  data() {
    return {
      treeDatas: {},  //文档目录数据
      documentation:{},  //文档数据
    }
  },
  methods:{
    selectedTree(selected){//处理点击输查询接口逻辑
      // selected：当前点击节点数据
      getDocumentation({
        id: selected.ID,
        type: selected.type
      }).then(res => {
        if(res.data.code === 0){
          thsi.documentation = res.data.data
        }
      })
    },
    getTrees() { //获取文档目录
      getDirectory().then(res => {
        if(res.data.code === 0){
          this.treeDatas = res.data.data
        }
      })
    }
  },
  created() {
    this.getTrees()
  }
}
</script>
