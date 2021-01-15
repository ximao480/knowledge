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
            :data="articleLists"
            @on-search="searchArticle"
          >
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
      articleLists:[]
    }
  },
  methods:{
    searchArticle(query) {
      console.log(`查询条件:${query}`,window.cancle)
      window.cancle();
      queryList({
        name: query
      }).then(res => {
        console.log(res)
      }).catch((err) => {
      if (axios.isCancel(err)) {
        console.log('Rquest canceled'); // 请求如果被取消，这里是返回取消的message
      } else {
      // handle error
        console.log(err);
      }
    });
    }
  }
}
</script>
