<template>
  <div class="document">
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
        <span class="readNumber">
          <i class="iconfont iconpublic"></i>
          {{detail.readerNumber}}人阅读
        </span>
      </p>

      <!-- 评论按钮 -->
      <div class="fPaanK">
        <div :class="switcher?'brDhtl':'kHWccG'" @mouseover="switcher = true" @mouseout="switcher = false">
          <div class="hJVDku" @mouseover="switcher = true" v-show="!switcher">
            <i class="iconfont iconios-arrow-back"></i>
          </div>
          <div class="hJVDku" v-show="switcher">
            <Tooltip :content="`评论(${detail.commentsNumber})`" placement="top">
              <span @click="Drawer = true">
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
          <p class="title">
            <span>评论</span>
            <i class="iconfont iconbj_delete2" @click="Drawer = false"></i>
          </p>
          <p class="fresh">
            <i class="iconfont iconios-refresh"></i>
          </p>
          <div class="comment">
            <div class="commentItem">
              <div>
                <div class="title">
                  <div>
                    <span>
                      <img src="https://static.dingtalk.com/media/lADPDgQ9qfyFXpLNAyrNAyk_809_810.jpg" alt="">
                    </span>
                    <span class="fvlLNV">
                      谢世华
                    </span>
                  </div>
                  <div class="time">
                    33分钟前
                  </div>
                </div>
                <div class="content">
                  <article>1123123</article>
                </div>
              </div>
            </div>
          </div>
          <div class="publishBox">
            <div class="input">
              <Input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="输入评论"
              />
            </div>
            <div class="publish">
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
</template>
<script>
export default {
  props:{
    detail:{
      type: Object,
      default:{}
    }
  },
  data() {
    return {
      switcher: false,  //控制评论图标展示
      Drawer: false,  //控制评论详情区
      text: '**镜像名**: registry-vpc.cn-hangzhou.aliyuncs.com/syman-nj/ark-web-security\n**镜像Tag**: 1.0.11 （暂时没有latest:heavy_exclamation_mark:）\n\n`使用加密镜像需要前端配合，前端需要引入文件encryptingParameter进行加密:bangbang:`\n\n\n\n# 环境变量\n|  环境变量 |  描述 |\n| ------------ | ------------ |\n| PROXY_CONFIG |  proxy.json 设置代理文件地址 |\n| DIST_PATH |  dist静态资源文件地址 |\n| OSS_REGION |  oss的region  |\n| OSS_ACCESSKEYID |  oss的accessKeyId   |\n| OSS_ACCESSKEYSECRET |  oss的accessKeySecret    |\n| OSS_BUCKET |  oss的bucket     |\n\n### proxy.json配置  [fastify路由配置规则(新开浏览器)](https://www.fastify.cn/docs/latest/Routes/)\n    {\n      \"proxy\": [\n        {\n          \"route\": \"/p/:uri(^c.*)/*\",\n          \"domain\": \"http://r3-ishop.dev.syman.cn\"(需要转发的地址,同一集群下需要使用集群ip)\n        },\n        {\n          \"route\": \"/:gateway/p/:uri(^c.*)/*\",\n          \"domain\": \"http://r3-ishop.dev.syman.cn\"\n        }\n      ]\n    }\n'
    }
  },
  methods:{
    copyUrl() {  //复制链接
      var input = document.createElement('input');
      input.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
      input.setAttribute('value', window.location.href);
      document.body.appendChild(input);
      input.select();
      var res = document.execCommand('copy');
      document.body.removeChild(input);
    },
    fullScreen() {  //全屏展示
      this.$refs.md.toolbar_right_click('read')
    },
    navigationToggle() { //切换大纲
      this.$refs.md.toolbar_right_click('navigation')
    }
  }
}
</script>
