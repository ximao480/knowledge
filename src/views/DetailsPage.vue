<template>
  <div class="DetailsPage">
    <!-- 目录 -->
    <div class="directory">
      <tree @selectedTree="selectedTree" :treeDatas="treeDatas"></tree>
      <div class="flex-box-resizer"></div>
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
import { DispatchEvent } from '../utils/dispatchEvent'
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
      getDocumentation({
        id: selected.businessId,
        type: selected.type,
      })
        .then((res) => {
          if (res && res.data.code === 0) {
            this.$refs.document.clearStatus();
            res.data.data.updateTime = new DateUtil(
              new Date(res.data.data.updateTime),
            ).getDateDiff();
            this.documentation = res.data.data;
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
              // let tree = this.$_live_getChildComponent(window.knowledgevm,'treeMD')
              // tree.expandNode(Number(this.$route.params.id))
              DispatchEvent('treeTriger',{
                detail: this.$route.params.id
              })
              window.history.pushState(null,null,'/')

            })
          }
        }
      });
    },
  },
  created() {
    this.getTrees();
  },
  mounted() {
  },
};
</script>
