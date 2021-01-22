<template>
  <div class="navigation">
    <div class="content">
      <div></div>
      <div class="right">
        <div class="search">
          <!-- <Input placeholder="搜索知识页、知识本、知识库" style="width: 260px">
            <Icon type="ios-search" slot="prefix" />
          </Input> -->
          <AutoComplete
            v-model="query"
            icon="ios-search"
            placeholder="搜索知识页、知识本、知识库"
            style="width:260px"
            clearable
            @on-search="searchArticle"
          >
            <div class="searchItem" v-for="(item,index) in articleLists" :key="index" @click="articleJump(item)">
              <div>
                <span class="file" v-if="Number(item.type) === 1 "></span>
                <span v-else class="folder"></span>
                <p v-html="item.content"></p>
              </div>
            </div>
          </AutoComplete>
        </div>
        <div class="help">
          <Poptip trigger="hover"  content="content" placement="bottom-end">
            <i class="iconfont iconios-help-circle-outline"></i>

            <div slot="content">
              <ul>
                <li>
                  <i class="iconfont iconbj_calendar"></i>
                  <span>更新日志</span>
                </li>
              </ul>
            </div>
          </Poptip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { queryList } from '../utils/api';
import axios from 'axios';
export default {
  data() {
    return {
      query: null, //模糊搜索字段
      articleLists:[],  //模糊列表
    }
  },
  methods:{
    searchArticle() {  //文件模糊搜索
      let query = this.query
      if(!query){
        this.articleLists = []
        return
      }
      window.cancle();
      queryList({
          content: query
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
    articleJump(item) {  //文件跳转
      let tree = this.$_live_getChildComponent(window.vm,'treeMD')
      tree.expandNode(Number(item.type) === 1?Number(item.mind_id):Number(item.folder_id))
    }
  }
}
</script>
