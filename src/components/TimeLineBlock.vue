<template>
  <div class="Timeline">
    <Timeline>
        <TimelineItem color="blue" v-for="(item,index) in lists" :key="index">
          <p class="item">
            <slot name="knowledge" :data="item" v-if="hiddenContent">
            </slot>
            <slot name="tasks" :data="item" v-if="hiddenContent">
            </slot>
            <span v-else>{{item.message.replace(/<[^>]+>/g,"")}}</span>
            <span>{{item.creationdate}}</span>
          </p>
        </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import { globalBus } from "../utils/bus.js";
export default {
  name: 'TimeLineBlock',
  props:{
    hiddenContent: {  //是否展示slot
      type: Boolean,
      default: false,
    },
    lists:{  //展示数据
      type: Array,
      default: () => [
        // {
        //     createTime: '',
        //     content: '',
        // }
      ],
    },
  },
  //  watch: {

  //    lists:{  //参数新的值newVal。 没有旧的值
  //         handler(newVal,oldval){//handler函数名是固定的
  //           console.log('新的',oldval);
  //         },
  //          deep:true//开启深度监听
  //   }
  // },
  mounted() {
   globalBus.$on("ascendingOrder",()=>{
      this.lists.sort((a,b)=>{return ( b.level -a.level)})
   });
   globalBus.$on("descendingorder",()=>{
      this.lists.sort((a,b)=>{return (a.level- b.level)})
   })
   }
};
</script>
