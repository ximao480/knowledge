<template>
  <div class="Tasks">
    <TimeLineBlock
      v-if="Timelines.length > 0"
      :lists="Timelines"
      :hiddenContent="current.name != 'dynamic'"
    >
      <div slot="tasks" slot-scope="item" v-if="current.name === 'tasks'">
                                                                                      <!--  -->
        <p class="content" :class="item.type == 1?'noActive':''" @click="openChanDao(item.data)">{{item.data.message.slice(0,5)}}创建了：</p>
        
        <svg
          class="icon icons"
          aria-hidden="true"
          style="
            width: 15px;
            height: 25px;
            margin: 0 2px 0px 5px;
            vertical-align: text-bottom;
          "
        >
          <use :xlink:href="'#' + svgType(item)" />
        </svg>
        <span class="content" :class="item.type == 1?'noActive':''">{{item.data.message.slice(10,-4)}}</span>  
        <span class="content spans" :class="item.type == 1?'noActive':''" @click="openChanDao(item.data)" style="text-decoration:underline;" >{{item.data.message.slice(-4,-1)}}</span>
      </div>


      <div slot="knowledge" slot-scope="item" v-if="current.name === 'knowledge'">
        <p class="content" v-html="messageHtml(item.data)" @click="openKnowledge(item.data)"></p>
      </div>
    </TimeLineBlock>

    <svg v-if="Timelines.length === 0" class="icon" aria-hidden="true" >
      <use xlink:href="#iconnone-data"></use>
    </svg>
  </div>
</template>
<script>
import TimeLineBlock from './TimeLineBlock.vue';
import { getTasks, checkZenTao, goZenTao } from '../utils/api';
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
    svgType(current){
      return (current) => {
        console.log(current)
        if(current.data.type === 1) {
          console.log('%c'+'1','color:green')
          return 'icongitee'
        }else{
          console.log('%c'+'2','color:green')
          return 'iconchandao1'
        }
      }
    },
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
          return `${current.ename}邀请你协作${html}<span class='span1' style="text-decoration:underline">${current.fileName}</span>`
      }
    },
   assistantHtml(current) {
     console.log(current);
      return (current) => {
         console.log(current)
        let html = `${this.assistant.fileName}`
        return current.message.replace('${}',html)
      }
    },
  },
  data() {
    return {
      xlink:'',
      Timelines:[],
      // assistant:[],
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
        8:{
          icon: 'iconothers'
        }, //其他
        9:{
          icon: 'iconppt'
        },
        10:{
          icon:'gitee'
        } //ppt
      },
    };
  },
  mounted () {
      //  console.log(this.assistant);
       console.log(this.urlMap)
       console.log(this.current)
  },
  methods: {
    look(item){
      console.log(item);
    },
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
              // item.message = item.message.substring(0,12)//切割字符串
              // console.log(item)
              // this.assistant.push(item)
             return item
            })
            this.Timelines = data;
            
          };
        });
    },
    openKnowledge (item) {  //打开文件
      if(item.fileType === 7){
        window.basevm.$router.push(`/repository#/?fileType=${item.fileType}&folderId=${item.fileId}&pageType=workbench`)
      }else{
        window.$DocOpen({
          id: item.fileId,
          fileType: item.fileType,
          ptype: item.ptype
        })
      }

    },
    openChanDao (item) {  //打开禅道
      if(item.type === 1){
      }else{
        checkZenTao().then(res => {

          // 模拟登录禅道
          var iframe = document.createElement("iframe");
          iframe.style.display = "none";
          iframe.id = "iframe";
          document.body.appendChild(iframe);
          document.getElementById("iframe").src = res.data.data;

          window.open(item.linkPath)

        })

      }

    }
  },
  created() {
    this.init();
  },
};
</script>
