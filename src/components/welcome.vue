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
              <a :href="item.url" target="_blank">{{item.content}}</a>
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
          url: 'http://online-editor.pro.burgeononline.com/p/c/online/editor?data=JTdCJTIyY2FsbGJhY2tVcmwlMjIlM0ElMjJodHRwJTNBJTJGJTJGYXJrLXNoYXJlLWJhc2UtcHJvLmRldi5idXJnZW9ub25saW5lLmNvbSUyRmFya3NoYXJlLWFwcCUyRnAlMkZjJTJGYXJrX3NoYXJlJTJGb25saW5lJTJGY2FsbEJhY2slMjIlMkMlMjJmaWxlSWQlMjIlM0E4MTMlMkMlMjJmaWxlTmFtZSUyMiUzQSUyMkFSSyUyMFNoYXJlJUU2JTk2JUIwJUU3JTg5JTg4JUU0JUJEJUJGJUU3JTk0JUE4JUU2JTk2JTg3JUU2JUExJUEzJTIyJTJDJTIyZmlsZVR5cGUlMjIlM0E0JTJDJTIyZmlsZVVybCUyMiUzQSUyMmh0dHAlM0ElMkYlMkZhcmstc2hhcmUub3NzLWNuLXNoYW5naGFpLmFsaXl1bmNzLmNvbSUyRmFya3NoYXJlLXBybyUyRmFya2RvY3MlMkY4MTMlMkZBUkslMjBTaGFyZSVFNiU5NiVCMCVFNyU4OSU4OCVFNCVCRCVCRiVFNyU5NCVBOCVFNiU5NiU4NyVFNiVBMSVBMy5kb2N4JTIyJTJDJTIycHR5cGUlMjIlM0ExJTJDJTIydXNlcklkJTIyJTNBMTMzNCUyQyUyMnVzZXJOYW1lJTIyJTNBJTIyJUU5JTgzJUFEJUU1JUJBJTg2JUU0JUJDJThEJTIyJTdE',
        },
        {
          label: '更新日志',
          content: '日志',
          url: 'http://ark-share-base.dev.burgeononline.com/version',
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
  }
};
</script>
