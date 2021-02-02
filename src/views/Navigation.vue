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
          <Input placeholder="新搜索,试一试" style="width: 260px" readonly @click.native="openSearchModal">
            <Icon type="ios-search" slot="prefix" />
          </Input>
          <!-- <AutoComplete
            icon="ios-search"
            placeholder="搜索知识库"
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
                    <p class="fold" v-html="item.title"></p>
                  </div>
                  <p class="file" v-html="item.content"></p>
                  <p class="file title" v-html="`R3框架 / ${item.title}`"></p>
                </div>
              </Option>

            </div>

            <div class="emptyTips" v-if="query && articleLists.length === 0">
              找不到包含以下关键词的结果<br>"{{query}}"
            </div>
          </AutoComplete> -->
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


    <!-- 模糊搜索弹窗 -->
    <Modal
      class="SearchPopups"
      v-model="fuzzySearch.show"
      footer-hide
      mask
      :width="'800px'"
      @on-keydown="keyDown"
    >
      <fuzzySearchPopups
        v-if="fuzzySearch.show"
        @closeModal="fuzzySearch.show = false"
        @articleJump="articleJump"
      >
      </fuzzySearchPopups>
    </Modal>
  </div>
</template>
<script>

import axios from 'axios';
import { DispatchEvent } from '../utils/dispatchEvent';
import fuzzySearchPopups from '../components/fuzzySearchPopups';
export default {
  components:{ fuzzySearchPopups },
  data() {
    return {
      img: require("../assets/img/list.png").default,
      query: null, // 模糊搜索数据
      articleLists:[],  //模糊列表

      fuzzySearch:{
        show: false
      }
    }
  },
  methods:{
    openSearchModal() {  //打开模糊搜索弹窗
      this.fuzzySearch.show = true
    },
    articleJump(item) {  //文件跳转
    // console.log(window.knowledgevm)
      // let tree = this.$_live_getChildComponent(window.knowledgevm,'treeMD')
      // tree.expandNode(item.only_id)
      DispatchEvent('treeTriger',{
        detail:item.only_id
      })

      // var e = document.createEvent("MouseEvents");
      // e.initEvent("click", true, true);
      // document.getElementsByTagName("body")[0].dispatchEvent(e);
    },
    update() {  //更新日志
      this.$Message.info({
                    content: '尽情期待'
                });
    },
    keyDown(event) {  //模糊搜索弹框快捷键
      if(event.keyCode === 27){  //esc快捷键
        this.fuzzySearch.show = false
      }
    },
    jumpCommunity() {  //跳转到论坛
      window.basevm.$router.push('/community/forumContent/Consulting/12')
    }
  }
}
</script>
