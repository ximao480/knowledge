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
            icon="ios-search"
            placeholder="搜索知识页、知识本、知识库"
            style="width:260px"
            clearable
            @on-change="searchArticle"
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
      articleLists:[],  //模糊列表
    }
  },
  methods:{
    searchArticle(query) {  //文件模糊搜索

      if(!query){
        let AutoComplete = this.$_live_getChildComponent(window.vm,'AutoComplete')
        AutoComplete.currentValue = ''
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
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      document.getElementsByTagName("body")[0].dispatchEvent(e);
      let AutoComplete = this.$_live_getChildComponent(window.vm,'AutoComplete')
      AutoComplete.currentValue = ''
    }
  }
}
</script>
