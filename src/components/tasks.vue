<template>
  <div class="Tasks">
    <TimeLineBlock
      v-if="Timelines.length > 0"
      :lists="Timelines"
      :hiddenContent="current.name != 'dynamic'"
    >
      <div  slot="tasks" slot-scope="item"  v-if="current.name === 'tasks'" :class="['show',{'actives':item.type == 3}]" @click="open(item.data)">
        <span class="icon icons" v-if="shows(item)">
          <svg
            class="icon"
            aria-hidden="true"
            style="
              width: 15px;
              height: 25px;
              margin: 0 2px 0px 0px;
              vertical-align: text-bottom;">
            <use :xlink:href="'#' + svgType(item)" />
          </svg>
        </span>
        <span
          class="content"
          :class="item.type == 1 ? 'noActive' : ''"
          v-html="namehtml(item.data)"
        ></span>
        <span
          :class="['contents',item.type == 1 ? 'noActive' : '']"
          v-html="contentHtml(item.data)"
        ></span>
         <div class="iconbody">
            <span class="icon" v-html="svgbug(item.data)"></span>
        </div>
      </div>
     
      <!-- <div slot="knowledge" slot-scope="item" v-if="current.name === 'knowledge'">
        <p class="content" v-html="messageHtml(item.data)" @click="openKnowledge(item.data)"></p>
     </div> -->
    </TimeLineBlock>
    <!--时间 -->
    <svg v-if="Timelines.length === 0" class="icon" aria-hidden="true">
      <use xlink:href="#iconnone-data"></use>
    </svg>
  </div>
</template>
<script>
import TimeLineBlock from "./TimeLineBlock.vue";
import { getTasks, checkZenTao, goZenTao } from "../utils/api";
import DateUtil from "../utils/dateApi";
import { globalBus } from '../utils/bus';
// @ is an alias to /src
export default {
  name: "Tasks",
  components: { TimeLineBlock },
  props: {
    current: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    contentHtml(current) {
      return (current) => {
        let cjl = current.message.indexOf("创建了");
        let you = current.message.indexOf("邀请你协作");

        if (cjl !== -1) {
          return current.message.slice(cjl + 3);
        } else {
          return current.message.slice(you + 5);
        }
      };
    },
    namehtml(current) {
      return (current) => {
        // console.log(current);
        let cjl = current.message.indexOf("创建了");
        if(cjl !== -1){
         return current.message.slice(0, cjl + 3);
        }else{
        let you = current.message.indexOf("邀请你协作");
        let content = current.message.slice(0, you + 5);
        let icons ='icondesign1'
        let html = ` <svg
            class="icon"
            aria-hidden="true"
            style="
              width: 15px;
              height: 25px;
              margin: 0 2px 0px 5px;
              vertical-align: text-bottom;">
            <use xlink:href="#${icons}" />
          </svg>`
            console.log("触发了");
          if(current.type == 3){
           return `${content}${html}`
          }else{
             return `${content}`
          }
        
        }
      };
    },
    shows(current){
     return(current)=>{
        if(current.data.type==3){
          return false
        }else{
          return true
        }
     }
    },
    svgbug(current){
     return(current)=>{
        if(current.level==4){
          let html = `<svg t="1609208204562" class="icon svgs" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8069" width="200" height="200"><path d="M898.56 539.136c-16.384-106.496-98.304-212.992-106.496-217.088-8.192-16.384-28.672-20.48-49.152-16.384s-32.768 20.48-36.864 40.96c0 24.576-8.192 69.632-16.384 106.496-4.096-40.96-12.288-94.208-28.672-143.36-77.824-217.088-270.336-241.664-278.528-241.664-16.384-4.096-32.768 4.096-45.056 16.384-12.288 12.288-12.288 28.672-8.192 45.056 4.096 12.288 40.96 131.072 12.288 249.856v-4.096c-36.864-73.728-102.4-94.208-110.592-98.304-16.384-4.096-36.864 0-49.152 12.288-12.288 12.288-16.384 32.768-12.288 49.152 0 0 12.288 45.056-16.384 114.688-32.768 73.728-36.864 118.784-28.672 200.704 28.672 184.32 180.224 303.104 372.736 303.104 24.576 0 49.152 0 73.728-4.096 110.592-16.384 204.8-69.632 266.24-151.552 53.248-73.728 77.824-167.936 61.44-262.144z m-270.336 216.576h-36.352v71.68h-56.32v-72.192H388.608V696.32L522.24 504.832h69.12v201.216h36.352v49.664z" p-id="8070" fill="#f4ea2a"></path><path d="M531.456 566.272l-93.696 137.216v2.56h96.768v-139.776z" p-id="8071" fill="#f4ea2a"></path></svg>`
          return html
        }else if(current.level==3){
          let html = `<svg t="1609208189599" class="icon svgs" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7883" width="200" height="200"><path d="M898.56 539.136c-16.384-106.496-98.304-212.992-106.496-217.088-8.192-16.384-28.672-20.48-49.152-16.384s-32.768 20.48-36.864 40.96c0 24.576-8.192 69.632-16.384 106.496-4.096-40.96-12.288-94.208-28.672-143.36-77.824-217.088-270.336-241.664-278.528-241.664-16.384-4.096-32.768 4.096-45.056 16.384-12.288 12.288-12.288 28.672-8.192 45.056 4.096 12.288 40.96 131.072 12.288 249.856v-4.096c-36.864-73.728-102.4-94.208-110.592-98.304-16.384-4.096-36.864 0-49.152 12.288-12.288 12.288-16.384 32.768-12.288 49.152 0 0 12.288 45.056-16.384 114.688-32.768 73.728-36.864 118.784-28.672 200.704 28.672 184.32 180.224 303.104 372.736 303.104 24.576 0 49.152 0 73.728-4.096 110.592-16.384 204.8-69.632 266.24-151.552 53.248-73.728 77.824-167.936 61.44-262.144zM481.28 827.904c-13.824 0-27.136-0.512-38.4-1.024-11.776-0.512-22.528-2.56-33.28-4.608V773.12c11.776 2.56 24.064 4.608 34.816 5.632 11.264 1.024 22.528 2.048 34.816 2.048 10.24 0 19.456-1.024 28.16-2.56s16.384-4.608 23.04-7.68c7.168-3.072 11.776-8.192 15.872-14.336 3.584-6.144 5.632-14.336 5.632-24.064 0-18.944-7.168-31.232-21.504-38.4-14.336-7.168-34.816-10.24-60.416-10.24H445.44v-44.032h24.064c24.064 0 43.008-3.072 55.808-10.752 13.312-7.68 19.968-19.456 19.968-35.84 0-15.872-5.12-26.624-15.872-32.768-10.752-5.632-25.088-8.704-44.544-8.704-9.216 0-19.968 0.512-31.232 2.56-11.264 1.024-22.016 3.584-30.72 6.144v-46.592c7.68-2.56 17.408-4.608 30.208-6.144 12.8-2.048 25.088-2.56 38.4-2.56 16.896 0 32.256 1.024 46.08 4.608 13.824 3.072 25.088 7.68 34.816 14.336 9.216 7.168 16.896 15.872 22.016 26.624 5.12 11.264 7.68 24.576 7.68 39.424 0 18.432-4.608 32.768-13.312 44.032-8.704 10.752-22.016 19.456-39.424 25.088v2.56c20.992 3.584 35.84 12.8 46.08 24.576 10.24 12.8 14.848 28.672 14.848 49.152-1.024 61.44-43.52 92.672-129.024 92.672z" p-id="7884" fill="#f4ea2a"></path></svg>`
           return html
        }else if(current.level==2){
          let html =`<svg t="1609208088157" class="icon svgs" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7559" width="200" height="200"><path d="M898.56 539.136c-16.384-106.496-98.304-212.992-106.496-217.088-8.192-16.384-28.672-20.48-49.152-16.384s-32.768 20.48-36.864 40.96c0 24.576-8.192 69.632-16.384 106.496-4.096-40.96-12.288-94.208-28.672-143.36-77.824-217.088-270.336-241.664-278.528-241.664-16.384-4.096-32.768 4.096-45.056 16.384-12.288 12.288-12.288 28.672-8.192 45.056 4.096 12.288 40.96 131.072 12.288 249.856v-4.096c-36.864-73.728-102.4-94.208-110.592-98.304-16.384-4.096-36.864 0-49.152 12.288-12.288 12.288-16.384 32.768-12.288 49.152 0 0 12.288 45.056-16.384 114.688-32.768 73.728-36.864 118.784-28.672 200.704 28.672 184.32 180.224 303.104 372.736 303.104 24.576 0 49.152 0 73.728-4.096 110.592-16.384 204.8-69.632 266.24-151.552 53.248-73.728 77.824-167.936 61.44-262.144z m-278.528 287.232H401.408v-54.272c30.208-23.552 54.784-44.032 73.728-61.44 18.944-17.408 34.304-32.256 46.08-45.056 11.264-13.312 18.944-25.088 23.552-34.816 4.608-10.24 6.144-20.48 6.144-30.208 0-8.704-1.024-17.408-4.608-23.552-3.072-6.144-7.68-11.264-12.8-15.36-5.632-3.584-11.264-6.144-18.944-7.68-7.68-2.048-15.36-2.56-23.552-2.56-10.24 0-21.504 1.024-33.28 2.56s-23.552 4.608-36.864 8.192v-48.64c11.264-3.072 24.064-5.632 37.376-7.68 13.824-2.048 28.16-2.56 42.496-2.56 33.792 0 60.416 7.68 79.872 22.528 18.944 14.848 28.672 37.376 28.672 68.096 0 13.312-2.048 26.112-5.12 37.376-3.072 12.288-8.704 24.064-17.92 36.352-8.704 12.288-20.992 25.6-36.352 39.936s-34.816 31.744-59.392 51.2l-19.968 15.36v3.072h148.48v49.152z" p-id="7560" fill="#f16a0f"></path></svg>`
           return html
        }else if(current.level==1){
          let html =`<svg t="1609207651158" class="icon svgs" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7235" width="200" height="200"><path d="M898.56 539.136c-16.384-106.496-98.304-212.992-106.496-217.088-8.192-16.384-28.672-20.48-49.152-16.384s-32.768 20.48-36.864 40.96c0 24.576-8.192 69.632-16.384 106.496-4.096-40.96-12.288-94.208-28.672-143.36-77.824-217.088-270.336-241.664-278.528-241.664-16.384-4.096-32.768 4.096-45.056 16.384-12.288 12.288-12.288 28.672-8.192 45.056 4.096 12.288 40.96 131.072 12.288 249.856v-4.096c-36.864-73.728-102.4-94.208-110.592-98.304-16.384-4.096-36.864 0-49.152 12.288-12.288 12.288-16.384 32.768-12.288 49.152 0 0 12.288 45.056-16.384 114.688-32.768 73.728-36.864 118.784-28.672 200.704 28.672 184.32 180.224 303.104 372.736 303.104 24.576 0 49.152 0 73.728-4.096 110.592-16.384 204.8-69.632 266.24-151.552 53.248-73.728 77.824-167.936 61.44-262.144zM563.2 827.904H503.808v-268.8l-79.36 15.36v-49.664l96.256-19.456h42.496v322.56z" p-id="7236" fill="#d81e06"></path></svg>`
           return html
        }
     }
    },
    
    svgType(current) {
      return (current) => {
        if (current.data.type === 1) {
            //  this.flag=true;
             return "icongitee";  
        } else if (current.data.type === 2) {
            return "iconchandao1";
        }else{
           return "";
        }
        
      };

    },
    xlinkHref(current) {
      return (current) => {
        return `#${this.iconMap[Number(current.fileType)].icon}`;
      };
    },
  },
  data() {
    return {
      flag:true,
      xlink: "",
      Timelines: [],
      
     
      // assistant:[],
      urlMap: {
        //接口映射
        tasks: "/p/cs/ark_share/workbech/need_to_deal",
        dynamic: "/p/cs/ark_share/workbench/user_notice",
        knowledge: "/p/cs/ark_share/workbench/repositoryNotice",
      },
      iconMap: {
        1: {
          icon: "iconarkmind",
        }, //思维导图
        2: {
          icon: "iconmarkdown1",
        }, //markdown
        3: {
          icon: "iconexcel1",
        }, //表格
        4: {
          icon: "icontext",
        }, //文档
        5: {
          icon: "iconaxure1",
        }, //原型
        6: {
          icon: "icondesign1",
        }, //视图
        7: {
          icon: "iconmy-project",
        }, //文件夹
        8: {
          icon: "iconothers",
        }, //其他
        9: {
          icon: "iconppt",
        },
        10: {
          icon: "gitee",
        }, //ppt
      },
    };
  },
  mounted() {
    // this.$nextTick(()=>{
    //   console.log(this.Timelines);
    // })
  },
  methods: {
    init() {
      this.getData();
      // console.log(333);
    },
    getData() {
      //获取数据
      getTasks(this.urlMap[this.current.name], {}).then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          let data = res.data.data.noticeMessage;
          // data.map((item) => {
          //   let date = new DateUtil(new Date(item.creationdate));
          //   item.creationdate = item.creationdate ? date.toLocaleDateString(): item.creationdate;
          //   return item;
          // });
        
          this.Timelines = data;
          globalBus.$emit("isshowtitle",this.Timelines)
          console.log( data);

        }
      });
    },
    open(item){
     window.open(item.linkPath);
    },
    openKnowledge(item) {
      //打开文件
      if (item.fileType === 7) {
        //fileType=${item.fileType}
        window.basevm.$router.push(
          `/repository#/?folderId=${item.fileId}&pageType=workbench`
        );
      } else {
        window.$DocOpen({
          id: item.fileId,
          fileType: item.fileType,
          ptype: item.ptype,
        });
      }
    },
    openChanDao(item) {
      //打开禅道
      // if(item.type === 1){
      // }else{
      checkZenTao().then((res) => {
        // 模拟登录禅道
        var iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.id = "iframe";
        document.body.appendChild(iframe);
        document.getElementById("iframe").src = res.data.data;
        window.open(item.linkPath);
      });
    },
    // }
  },
  created() {
    this.init();
  },
};
</script>
