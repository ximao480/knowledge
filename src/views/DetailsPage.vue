<template>
  <div class="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
     <tree></tree>
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
}
}
</script>
