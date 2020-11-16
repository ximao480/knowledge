<template>
  <div class="Tasks">
    <TimeLineBlock
      :lists="Timelines"
      :hiddenContent="current.name != 'dynamic'"
    >
      <div slot="tasks" slot-scope="item" v-if="current.name === 'tasks'">
        <p class="content" @click="openChanDao(item)">{{item.data.message}}</p>
      </div>
      <div slot="knowledge" slot-scope="item" v-if="current.name === 'knowledge'">
        <p class="content" @click="openKnowledge(item)" v-html="messageHtml(item.data)"></p>
      </div>
    </TimeLineBlock>
  </div>
</template>
<script>
import TimeLineBlock from './TimeLineBlock.vue';
import { getTasks } from '../utils/api';
import DateUtil from '../utils/dateApi';
// @ is an alias to /src
export default {
  name: 'Tasks',
  components: { TimeLineBlock },
  props:{
    current:{
      type: Object,
      default: () => {}
    }
  },
  computed:{
    xlinkHref(current) {
      return (current) => {
        return `#${this.iconMap[Number(current.fileType)].icon}`
      }
    },
    messageHtml(current) {
      return (current) => {
        let icon = this.xlinkHref(current);
        let html = `<svg class="icon" aria-hidden="true">
            <use xlink:href="${icon}"></use>
          </svg>`
        return current.message.replace('${}',html)
      }
    },
  },
  data() {
    return {
      Timelines:[],
      urlMap:{  //接口映射
        tasks: '/p/cs/ark_share/workbech/need_to_deal',
        dynamic: '/p/cs/ark_share/workbench/user_notice',
        knowledge: '/p/cs/ark_share/workbench/repositoryNotice'
      },
      iconMap:{
        1:{
          icon: 'iconarkmind',
        },  //思维导图
        2: {
          icon: 'iconmarkdown1',
        }, //markdown
        3: {
          icon: 'iconexcel1',
        },  //表格
        4: {
          icon: 'icontext',
        }, //文档
        5:{
          icon: 'iconaxure1',
        }, //原型
        6:{
          icon: 'icondesign1',
        }, //视图
        7:{
          icon: 'iconmy-project'
        }, //文件夹
      },
    };
  },
  methods: {
    init() {
      this.getData();
    },
    getData() {  //获取数据
      getTasks(this.urlMap[this.current.name],{

      })
        .then(res => {
          if(res.data.code === 0){
            let data = res.data.data.noticeMessage;
            data.map(item => {
              let date = new DateUtil(new Date(item.creationdate));
              item.creationdate = item.creationdate?date.toLocaleDateString():item.creationdate;
              return item
            })

            this.Timelines = data;
          };
        });
    },
    openKnowledge (item) {  //打开文档
      window.open(item.route)
    },
    openChanDao (item) {  //打开禅道
      window.open(item.linkPath)
    }
  },
  created() {
    this.init();
  },
};
</script>
