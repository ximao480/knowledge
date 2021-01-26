<template>
  <div class="document" v-if="detail.documentationId">
    <header>
      <div>
        <div class="left">

        </div>
        <div class="right">
          <Button type="text" @click="copyUrl">复制链接</Button>
          <i class="iconfont iconquanping" @click="fullScreen"></i>
        </div>
      </div>
    </header>
    <div class="content">
      <mavon-editor
        ref="md"
        class="editor"
        v-model="detail.content"
        :toolbarsFlag="false"
        :editable="false"
        :subfield="false"
        :defaultOpen="'preview'"
        :boxShadow="false"
        showNavigationClose
        previewBackground="#fff"
      ></mavon-editor>

      <!-- 文档页脚 -->
      <p class="documentation">
        <span class="updateTime">
          <i class="iconfont iconios-time-outline"></i>
          {{detail.updateTime}}更新
        </span>
        <Poptip trigger="hover">
          <!-- <Button>Click</Button> -->
          <span class="readNumber">
            <i class="iconfont iconpublic"></i>
            {{detail.readerNumber}}人阅读
          </span>
          <div slot="content" class="reader-list">
            <div v-for="(user, index) in detail.readerDTOList" :key="index" class="reader-info">
              <div class="reader-avatar">
                <img :src="user.readTheDingAvatar" alt="" v-if="user.readTheDingAvatar">
              </div>
              <div class="reader-name" :title="user.readTheName">{{user.readTheName}}</div>
            </div>
          </div>
        </Poptip>

      </p>

      <!-- 评论按钮 -->
      <div class="fPaanK">
        <div :class="switcher?'brDhtl':'kHWccG'" @mouseover="switcher = true" @mouseout="switcher = false">
          <div class="hJVDku" @mouseover="switcher = true" v-show="!switcher">
            <i class="iconfont iconios-arrow-back"></i>
          </div>
          <div class="hJVDku" v-show="switcher">
            <Tooltip :content="`评论(${detail.commentsNumber})`" placement="top">
              <span @click="Drawer = true;getComm()">
                <i class="iconfont iconmd-text"></i>
              </span>
            </Tooltip>

          </div>
        </div>
      </div>

      <!-- 评论详情区 -->
      <Drawer
        :mask="false"
        :inner="true"
        :closable="false"
        :transfer="false"
        v-model="Drawer"
      >
        <div class="drawer">
          <!-- loading -->
          <Spin fix v-if="commentsLoading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
          </Spin>

          <p class="title">
            <span>评论</span>
            <i class="iconfont iconbj_delete2" @click="Drawer = false"></i>
          </p>
          <p class="fresh">
            <i class="iconfont iconios-refresh"></i>
          </p>
          <div class="comment">
            <div class="commentItem" v-for="(item,index) in commentLists" :key="index">
              <div>
                <div class="title">
                  <div>
                    <span class="img">
                      <img v-if="item.avatar" :src="item.avatar" alt="">
                      <span v-else>{{item.userName.split('')[0]}}</span>
                    </span>
                    <span class="fvlLNV">
                      {{item.userName}}
                    </span>
                  </div>
                  <div class="time">
                    {{item.createTime}}
                  </div>
                </div>
                <div class="content">
                  <article>{{item.content}}</article>
                </div>
              </div>
            </div>
          </div>
          <div class="publishBox">
            <div class="input">
              <Input
                v-model="content"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="输入评论"
              />
            </div>
            <div class="publish" @click="commentPublish">
              <span>发送</span>
            </div>
          </div>
        </div>
      </Drawer>

    </div>
    <footer>
      <div>
        <div class="left">
          {{detail.wordCount}}个字
        </div>
        <div class="right" @click="navigationToggle">
          <i class="iconfont iconios-list"></i>
          <span>大纲</span>
        </div>
      </div>
    </footer>

  </div>
  <div class="document directory" v-else>
    <header>
      <div>
        {{detail.title}}
      </div>
    </header>
    <div class="content">
      <p v-for="(item,index) in detail.subdirectory" :key="index" @click="articleJump(item)">
        <a>{{item.title}}</a>
      </p>
    </div>
  </div>
</template>
<script>
import { getComment, addComment } from '../utils/api';
import DateUtil from '../utils/dateApi';

export default {
  props: {
    detail: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      switcher: false, // 控制评论图标展示
      Drawer: false, // 控制评论详情区
      commentLists: [], // 评论数据
      content: null, // 新增评论内容

      commentsLoading: false, // 评论区loading
    };
  },
  methods: {
    copyUrl() { // 复制链接
      const input = document.createElement('input');
      input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
      input.setAttribute('value', window.location.href);
      document.body.appendChild(input);
      input.select();
      const res = document.execCommand('copy');
      document.body.removeChild(input);
    },
    fullScreen() { // 全屏展示
      this.$refs.md.toolbar_right_click('read');
    },
    navigationToggle() { // 切换大纲
      this.$refs.md.toolbar_right_click('navigation');
    },
    getComm() { // 获取评论
      this.commentsLoading = true;
      this.content = null;
      getComment({
        id: this.detail.documentationId,
      }).then((res) => {
        this.commentsLoading = false;
        if (res.data.code === 0) {
          this.commentLists = res.data.data.map((item) => {
            item.createTime = new DateUtil(new Date(item.createTime)).getDateDiff();
            return item;
          });
        }
      });
    },
    commentPublish() { // 新增评论
      addComment({
        content: this.content,
        id: this.detail.documentationId,
      }).then((res) => {
        if (res.data.code === 0) {
          this.getComm();
        }
      });
    },
    clearStatus() { // 清空所有标记状态
      this.switcher = false; // 控制评论图标展示
      this.Drawer = false; // 控制评论详情区
      this.commentsLoading = false; // 评论区loading
    },
    articleJump(item) { // 文件跳转
      const tree = this.$_live_getChildComponent(window.basevm, 'treeMD');
      tree.expandNode(item.id);
    },
  },
};
</script>
