<template>
  <div class="home">
    <div v-for="(item, index) in moduleLists" :key="index" class="item">
       <p class="title" v-if="item.name==='tasks'">{{ item.title }}</p>
       <p v-if="item.name==='tasks'" :class="['position',{istitles:istitle.length<1}]">
        <span class="taskdescription">任务描述</span>
         <span class="span3" sortable: true>
            级别:
        <div style="display: inline-block;position: relative;">
         <svg
            @click="SendAscendingOrder"
            class="icontop"
            aria-hidden="true"
            style="
              width: 10px;
              height: 10px;
              margin: 0 2px 0px 5px;
              vertical-align: text-bottom;">
            <use :xlink:href="'#' + 'iconmd-arrow-dropdown'" />
          </svg>
        
            <svg
             @click="SendDescendingOrder"
            class="iconbottom"
            aria-hidden="true"
            style="
              width: 10px;
              height: 10px !important;
              position: absolute;
              top: 2px;
              left: 0px;
              margin: 0 2px 0px 5px;
              vertical-align: text-bottom;">
            <use :xlink:href="'#' + 'iconmd-arrow-dropup'" />
          </svg>
          </div>
         </span>
         <span class="span4" sortable: true>时间:</span>
      </p>
      <component :is="item.component" :current="item" ></component>       
    </div>
       
  </div>
</template>

<script>
import { mapState } from "vuex";
import { globalBus } from "../utils/bus.js";

import Welcome from "../components/welcome.vue";
export default {
  name: "Home",
  components: {
    Welcome,
  },
  data() {
    return {
      defaultCol: 2,
      istitle:[]
    };
    taskDescription
  },
  methods: {
    SendAscendingOrder(){
     globalBus.$emit("ascendingOrder");  
    },
    SendDescendingOrder(){
     globalBus.$emit("descendingorder");  
    },
  },
  mounted () {
    globalBus.$on("isshowtitle",(data)=>{
      //  console.log(data);
      this.istitle=data
       
    })
  },
  computed: {
    ...mapState({
      moduleLists: (state) => state.moduleLists,
    }),
  },
};
</script>

