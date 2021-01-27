<template>
  <div class="DetailsPage" id="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
      <tree @selectedTree="selectedTree" :treeDatas="treeDatas"></tree>
      <!-- <div class="flex-box-resizer"></div> -->
    </div>
    <!-- 详情 -->
    <div class="details">
      <!-- loading -->
      <Spin fix v-if="detailsLoading">
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
      <document ref="document" :detail="documentation"></document>
    </div>
  </div>
</template>
<script>
import tree from "./Tree/Tree";
import document from "../components/document";
import { getDirectory, getDocumentation } from "../utils/api";
import DateUtil from "../utils/dateApi";
import axios from "axios";
import { DispatchEvent } from '../utils/dispatchEvent';
import createWatermark from '../utils/waterMark';
// import jsonData from "../../static/js/ztree/treeData.json";
export default {
  components: {
    tree,
    document,
  },
  data() {
    return {
      treeDatas: [], // 文档目录数据
      documentation: {}, // 文档数据
      detailsLoading: false, // 文档内容loading
    };
  },
  methods: {
    selectedTree(selected) {
      // 处理点击输查询接口逻辑
      // selected：当前点击节点数据
      window.cancle();
      this.$Loading.start();
      getDocumentation({
        id: selected.businessId,
        type: selected.type,
      })
        .then((res) => {
          if (res && res.data.code === 0) {
            this.$nextTick(() => {
              this.$refs.document && this.$refs.document.clearStatus();
              res.data.data.updateTime = new DateUtil(
                new Date(res.data.data.updateTime),
              ).getDateDiff();
              this.documentation = res.data.data;
            });
            this.$Loading.finish();
          }else{
            this.$Loading.error();
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log('Rquest canceled'); // 请求如果被取消，这里是返回取消的message
          } else {
            console.log(err);
          }
        });
    },
    getTrees() {
      // 获取文档目录
      // this.treeDatas = jsonData.data;
      this.detailsLoading = true;
      getDirectory().then((res) => {
        this.detailsLoading = false;
        if (res.data.code === 0) {
          this.treeDatas = res.data.data;

          // 处理带默认文件时，默认打开携带的文件
          if (this.$route.params.id) {
            this.$nextTick(() => {
              setTimeout(() => {
                // let tree = this.$_live_getChildComponent(window.knowledgevm,'treeMD')
                // tree.expandNode(Number(this.$route.params.id))
                DispatchEvent('treeTriger', {
                  detail: this.$route.params.id,
                });
                window.history.pushState(null, null, '/');
              }, 200);
            });
          } else {
            this.$nextTick(() => {
              setTimeout(() => {
                // let tree = this.$_live_getChildComponent(window.knowledgevm,'treeMD')
                // tree.expandNode(Number(this.$route.params.id))
                DispatchEvent('treeTriger', {
                  detail: this.treeDatas[0].id,
                });
              }, 200);
            });
          }
        }
      });
    },
  },
  created() {
    this.getTrees();
    this.$nextTick(() => {
      createWatermark( {
        id: 'DetailsPage',
        textContent: ['R3快速开发平台'], // 每行显示的文本内容
        watermark_intervalWidth: 150, //  间隔宽度
        watermark_intervalheight: 150, // 间隔高度
        style: {
          webkitTransform: 'rotate(-30deg)',
          MozTransform: 'rotate(-30deg)',
          msTransform: 'rotate(-30deg)',
          OTransform: 'rotate(-30deg)',
          transform: 'rotate(-30deg)',
          visibility: '',
          position: 'absolute',
          overflow: 'hidden',
          zIndex: '9999',
          pointerEvents: 'none', // pointer-events:none  让水印不阻止交互事件
          opacity: 0.2,
          fontSize: '14px',
          fontFamily: '微软雅黑',
          color: '#3b7af5',
          textAlign: 'left',
          width: '200px',
          height: '80px',
          display: 'block',
          left: 0,//不支持设置定位，
          top: 0,
        }
      })
    })
  },
  mounted() {
  },
};
</script>
