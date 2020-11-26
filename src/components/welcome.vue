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
              <a  @click="open(item,index)">{{item.content}}</a>
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
          url: '/version',
        },
        {
          label: '关于ARK',
          content: '官网',
          url: 'http://ark.dev.syman.cn/',
        },

      ],
      userName: null,
    };
  },
  mounted(){
    this.userName =  window.localStorage.getItem('userInfoShare')?JSON.parse(window.localStorage.getItem('userInfoShare')).eName:null
  },
  methods:{
    open(item,index){
      if(index === 0){
        window.$DocOpen({
          fileType: 4,
          id: 813,
          ptype: 2
        })
      }else if(index ===1){
        window.open(`${window.location.origin}${item.url}`)
      }else{
        window.open(item.url)
      }
    }
  }
};
</script>
