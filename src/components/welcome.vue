<template>
  <div class="welcome">
    <div class="logo"></div>
    <div class="content">
      <p>Hi {{userName}}，欢迎使用ARK Share</p>
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
          label: '更新日志',
          content: '日志',
          url: '',
        },
        {
          label: '关于ARK',
          content: '官网',
          url: '',
        },

      ],
      userName: null,
    };
  },
  mounted(){
    this.userName =  window.localStorage.getItem('userInfoShare')?JSON.parse(window.localStorage.getItem('userInfoShare')).eName:null
  }
};
</script>
