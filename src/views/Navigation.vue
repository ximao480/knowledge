<template>
  <div class="navigation">
    <div class="content">
      <div class="left">
        <div class="header">
          <div>
            <img class="listicon" :src="img" />
            <span>R3框架</span>
          </div>

          <!-- <div class="directory"></div> -->
        </div>
      </div>
      <div class="right">
        <div class="search">
          <!-- <Input placeholder="搜索知识页、知识本、知识库" style="width: 260px">
            <Icon type="ios-search" slot="prefix" />
          </Input> -->
          <AutoComplete
            icon="ios-search"
            placeholder="搜索知识页、知识本、知识库"
            style="width:260px"
            ref="AutoComplete"
            clearable
            @on-change="searchArticle"
            @on-select="selectJump"
          >
            <div class="searchItem" v-for="(item,index) in articleLists" :key="index" @click="articleJump(item)">

              <Option :value="item.only_id" :key="item.only_id">
                <div>
                  <div style="display:flex">
                    <span class="file" v-if="Number(item.type) === 1 "></span>
                    <span v-else class="folder"></span>
                    <p v-html="item.title"></p>
                  </div>
                  <p class="file" v-html="item.content"></p>
                </div>
              </Option>

            </div>
          </AutoComplete>
        </div>
        <div class="help">
          <Poptip trigger="hover"  content="content" placement="bottom-end">
            <i class="iconfont iconios-help-circle-outline"></i>

            <div slot="content">
              <ul>
                <li @click="update">
                  <svg
                    class="icon"
                    aria-hidden="true"
                    fill="white"
                    style="width: 14px; height: 14px"
                  >
                    <use xlink:href="#iconbj_calendar"></use></svg
                  >
                  <span>更新日志</span>
                </li>
                <li
                  @click="jumpCommunity"
                >
                  <svg
                    class="icon"
                    aria-hidden="true"
                    fill="white"
                    style="width: 14px; height: 14px"
                  >
                    <use xlink:href="#iconcommunity"></use></svg
                  >
                  <span>社区论坛</span>
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
import { DispatchEvent } from '../utils/dispatchEvent'
export default {
  data() {
    return {
      img: require("../assets/img/list.png").default,
      articleLists:[],  //模糊列表
    }
  },
  methods:{
    searchArticle(query) {  //文件模糊搜索

      if(!query){
        this.$refs.AutoComplete.currentValue = ''
        // let AutoComplete = this.$_live_getChildComponent(window.knowledgevm,'AutoComplete')
        // AutoComplete.currentValue = ''
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
    selectJump(value) {
      if(value){
        this.articleJump({
          only_id: value
        })
      }

    },
    articleJump(item) {  //文件跳转
    // console.log(window.knowledgevm)
      // let tree = this.$_live_getChildComponent(window.knowledgevm,'treeMD')
      // tree.expandNode(item.only_id)
      DispatchEvent('treeTriger',{
        detail:item.only_id
      })

      var e = document.createEvent("MouseEvents");
      e.initEvent("click", true, true);
      document.getElementsByTagName("body")[0].dispatchEvent(e);
      this.$refs.AutoComplete.currentValue = ''
    },
    update() {  //更新日志
      this.$Message.loading({
                    content: '尽情期待'
                });
    },
    jumpCommunity() {  //跳转到论坛
      window.basevm.$router.push('/community/forumContent/Consulting/2')
    }
  }
}
</script>
