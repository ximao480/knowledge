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
        请输入标题或内容开始搜索
      </div>
      <div class="tips" v-if="articleLists.length === 0 && query">
        找不到包含以下关键词的结果<br>"{{query}}"
      </div>
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
      query: '', // 模糊搜索数据
      articleLists:[],  //模糊列表
    }
  },
  methods:{
    close() {
      this.$emit('closeModal')
    },
    clearQuery() {  //清空查询条件
      this.query = ''
      this.articleLists = []
    },
    searchArticle() {  //文件模糊搜索

      if(!this.query){
        this.articleLists = []
        this.query = ''
        return
      }
      window.cancle();
      queryList({
          content: this.query
        }).then(res => {
          if(res.data.code === 0){
            this.articleLists = res.data.data
          }
        }).catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Rquest canceled'); // 请求如果被取消，这里是返回取消的message
        } else {
          console.log(err);
        }
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
