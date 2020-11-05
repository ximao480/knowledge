<template>
  <div class="welcome">
    <div class="logo"></div>
    <div class="content">
      <p>Hi 六月，欢迎使用ARK Share</p>
      <p>ARK Share 是一站式敏捷研发协作平台， 帮助团队透明工作进展，提升协作效率</p>

      <div>
        <p class="title">快速开始</p>

        <ul>
          <li v-for="(item,index) in guides" :key="index">
              <span class="dot"></span>
              <span class="label">{{item.label}}:</span>
              <router-link :to="item.url">{{item.content}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Welcome',
  data() {
    return {
      guides: [
        {
          label: '新手指引',
          content: '介绍+快速上手',
          url: '',
        },
        {
          label: '新手指引',
          content: '介绍+快速上手',
          url: '',
        },
        {
          label: '新手指引',
          content: '介绍+快速上手',
          url: '',
        },
        {
          label: '新手指引',
          content: '介绍+快速上手',
          url: '',
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.welcome{
  width: 100%;
  height: 100%;
  padding-top: 32px;
  display: flex;
  flex-direction: row;

  .logo{
    width: 200px;
    margin-right: 30px;
    height: 195px;
    padding: 10px 0 20px 0;
    background: url('../assets/person.png');
    background-size: contain;
  }

  .content{
    flex: 1;

    >p{
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #313231;
      line-height: 20px;
      margin-bottom: 16px;
    }

    >div{
      >.title{
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #313231;
        line-height: 20px;
        margin-bottom: 9px;
      }

      li{
        margin-bottom: 10px;

        .dot{
          display: inline-block;
          width: 2px;
          height: 2px;
          background: #A5A5A5;
          border-radius: 50%;
          vertical-align: middle;
          margin-right: 10px;
        }

        .label{
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #A5A5A5;
          line-height: 18px;
          margin-right: 8px;
        }

        .url{
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3A7BF5;
          line-height: 18px;
        }
      }
    }
  }
}
</style>
