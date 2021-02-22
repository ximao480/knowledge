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
        <div class="chandao">
          <Dropdown>
            <a href="javascript:void(0)">
                需求提报
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem v-for="(item,index) in zenDaoList" :key="index" type="text" :title="item.projectName" @click.native="zenDaoJump(item)">{{item.projectName}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
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
import { zenDaoList, zenDaoCookie, zenDaoCheck } from '../utils/api';
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
      },

      zenDaoList: []  //禅道地址
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
          content: '敬请期待'
      });
    },
    keyDown(event) {  //模糊搜索弹框快捷键
      if(event.keyCode === 27){  //esc快捷键
        this.fuzzySearch.show = false
      }
    },
    jumpCommunity() {  //跳转到论坛
      window.basevm.$router.push('/community/forumContent/Consulting/12')
    },
    getZenDao() {  //获取R3和JFLOW禅道地址
      zenDaoList()
        .then(res => {
          this.zenDaoList = res.data.data.filter(item => {
            let projectNames = ['R3快速开发平台','Jflow']
            if(projectNames.includes(item.projectName)){
              return item
            }
          })
        })
    },
    zenDaoJump(item) {  //跳转到禅道
      zenDaoCheck('/p/cs/checkUserZendao',{
        domain:item.projectUrl
      }).then(res => {
        if(res.data.data){
          zenDaoCookie()
          .then(res => {
            if(res.data.code === 0){
              window.open(item.projectUrl)
            }
          })
        }else{
          this.$Message.warning({
            content: `无${item.projectName}禅道项目访问权限,请联系${item.projectName}项目管理员!`
          })
        }
      })
    }
  },
  created() {
    this.getZenDao()
  }
}
</script>
