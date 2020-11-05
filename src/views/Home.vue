<template>
  <div class="home">
    <div v-for="(item,index) in moduleLists" :key="index" class="item">
      <p class="title">{{item.title}}</p>
      <Welcome></Welcome>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Welcome from '../components/welcome.vue';

// @ is an alias to /src
export default {
  name: 'Home',
  components: {
    Welcome,
  },
  data() {
    return {
      defaultCol: 2,
    };
  },
  computed: {
    ...mapState({
      moduleLists: ((state) => state.moduleLists),
    }),
  },
};
</script>
<style lang="less" scoped>
@defaultCol: 2;
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #ECEEF1;
  padding: 12px;

  .item{
    box-sizing: border-box;
    width: percentage(1/@defaultCol);
    height: calc(percentage(1/@defaultCol) - 6px);
    background: white;
    border-radius: 4px;
    padding: 20px 20px 20px 16px;
    display: flex;
    flex-direction: column;

    .title{
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #4E4E4E;
      line-height: 22px;
    }

    >div{
      flex: 1;
      overflow: hidden;
    }
  }

  .item:nth-child(2n){
    width: calc(percentage(1/@defaultCol) - 12px);

    margin-left: 12px;
  }

  .item:nth-child(n+1){
    margin-top: 12px;
  }

  .item:first-child,.item:nth-child(2){
    margin-top: 0;
  }
}
</style>
