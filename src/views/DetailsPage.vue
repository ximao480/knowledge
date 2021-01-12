<template>
  <div class="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
     <tree @selectedTree='selectedTree'></tree>
      <div class="flex-box-resizer">
      </div>
    </div>
    <!-- 详情 -->
    <div class="details">
      <document></document>
    </div>
  </div>
</template>
<script>
import tree from './Tree/Tree'
import document from '../components/document';

export default {
components:{
  tree,
  document
},
methods:{
      selectedTree(selected){//处理点击输查询接口逻辑
         // selected：当前点击节点数据
         console.log('当前点击节点ID',selected)
      }
}
}
</script>
