<template>
  <div class="document">
    <header>
      <div>
        <div class="left">

        </div>
        <div class="right">
          <Button type="text">复制链接</Button>
          <i class="iconfont iconyanshiPPT" @click="fullScreen"></i>
        </div>
      </div>
    </header>
    <div>
      <mavon-editor
        v-model="text"
        :toolbarsFlag="false"
        :editable="false"
        :subfield="false"
        :defaultOpen="'preview'"
      ></mavon-editor>
    </div>
    <footer>
      <div>
        <div class="left">
          52字
        </div>
        <div class="right">
          <span @click="navigationToggle">大纲</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: '123213'
    }
  },
  methods:{
    fullScreen() {  //全屏展示
      console.log('全屏展示')
    },
    navigationToggle() { //切换大纲
      console.log('切换大纲')
    }
  }
}
</script>
