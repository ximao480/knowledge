<template>
  <div class="fuzzySearchPopups">
    <div class="searchContent">
      <Icon type="ios-search"/>
      <Input v-model="query" @on-change="searchArticle" placeholder="搜索"></Input>
      <p class="options">
        <span class="item" v-if="query" @click="clearQuery">清空</span>
        <span class="blank" v-if="query"></span>
        <Icon class="item" type="md-close" @click="close"/>
      </p>
    </div>
    <div class="blank"></div>
    <div class="content">
      <div class="tips" v-if="articleLists.length === 0 && !query">
        <img :src="emptyLogo" alt="">
      </div>
      <div class="tips" v-if="articleLists.length === 0 && query">
        找不到包含以下关键词的结果"{{query}}"
      </div>
      <Scroll height="484"  v-if="articleLists && articleLists.length > 0" :on-reach-bottom="handleReachBottom">
        <div v-for="(item,index) in articleLists" :key="index" class="itemContent" @click="selectJump(item)">
          <div class="logo">
            <span class="file" v-if="Number(item.type) === 1 "></span>
            <span v-else class="folder"></span>
          </div>
          <div class="item">
            <p class="title" v-html="item.title"></p>
            <p class="file" v-html="item.content"></p>
            <p class="directoryfile" v-html="`R3框架 / ${item.title}`"></p>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { queryList } from '../utils/api';
export default {
  props:{
    closeModal:{
      type: Function,
      default: () => {}
    },
    articleJump:{
      type: Function,
      default:() => {}
    }
  },
  data() {
    return{
      emptyLogo: require('../assets/img/empty.png').default,
      query: '', // 模糊搜索数据
      articleLists:[],  //模糊列表

      page:{
        pageSize: 10,
        pageNum: 1,
        maxPageNum: 1
      }
    }
  },
  methods:{
    close() {
      this.$emit('closeModal')
    },
    clearQuery() {  //清空查询条件
      this.query = ''
      this.articleLists = []
      this.page = {
        pageSize: 10,
        pageNum: 1,
        maxPageNum: 1
      }
    },
    searchArticle(resolve) {  //文件模糊搜索

      if(!this.query){
        this.articleLists = []
        this.query = ''
        return
      }
      window.cancle();
      queryList({
          content: this.query,
          pageSize: this.page.pageSize,
          pageNum: this.page.pageNum
        }).then(res => {
          if(res.data.code === 0){
            this.page.maxPageNum = Math.floor(res.data.data.sum/this.page.pageSize)
            if(resolve && typeof resolve ===  'function'){
              setTimeout(() => {
                this.articleLists = this.articleLists.concat(res.data.data.object)
                resolve()
              },1000)
            }else{
              this.articleLists = res.data.data.object
            }


          }
        }).catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Rquest canceled'); // 请求如果被取消，这里是返回取消的message
        } else {
          console.log(err);
        }
      });
    },
    handleReachBottom(dir) {  //文档滚动到底部
      this.page.pageNum++;
      return new Promise(resolve => {
          this.searchArticle(resolve)
      });
    },
    selectJump(item) {  //文件跳转
      this.$emit('articleJump',item)
      this.close()
    }
  },
  mounted() {

  }
}
</script>
