<template>
  <div class="Timeline">
    <Timeline>
        <TimelineItem color="blue" v-for="(item,index) in lists" :key="index">
          <svg class="icon" aria-hidden="true" slot="dot">
            <use xlink:href="#iconpoint"></use>
          </svg>
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
  mounted() {
   console.log( this.lists);
   
  },
};
</script>
