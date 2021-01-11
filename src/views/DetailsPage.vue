<template>
  <div class="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
      1
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
import document from '../components/document';

export default {
  components: { document }
}
</script>
