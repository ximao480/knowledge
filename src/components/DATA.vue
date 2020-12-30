<template>
   <div :class="['Calendar',{'actives':schedulelist.length < 1}]">
      <div class="contentkk">
          <div class="my">我的日程</div>
          <div class="ss">
             <template>
                <Row>
                    <Col span="12">
                    <!-- :placeholder="todayDatesss" -->
                        <DatePicker  type="date"  style="width: 200px;color:#000" v-model="queryTime" @on-change="changetimes"></DatePicker>
                    </Col>
                </Row>
             </template>
          </div>
          <div class="rc" @click="pop">+新增日程</div>
          <div class="qb" @click="skip">查看全部</div>
         </div>
      <div class="content"> 
          <!-- <div class="items" v-if="schedulelist.length < 1 ? false:true" >
            <p class="">时间<span style="margin-left:20px">日程内容</span></p>
          </div> -->
           <div v-for="(item,index) in schedulelist" :key="index" class="items" >
             <p class="calendarshows" @click="detail(item)">{{item.startTime}} <span>{{item.title}}</span></p>
          </div>
      </div>
      <Modal></Modal>
   </div>
</template>
<script>
import {getQueryMySimpleScheduleDate} from '../utils/api.js'
import { globalBus } from "../utils/bus.js";
import moment from "moment";
import  Modal from './Modal'
 export default {

     components: { 
       Modal,
     },
     data () {
         return {
             value:"",
             flag:"1",
             queryTime:moment(new Date()).format("YYYY-MM-DD"),
             todayDatesss: moment(new Date()).format("YYYY-MM-DD"),
             schedulelist:[],
             flag1:true,
             flag2:true
         }
     },
     methods: {
        detail(item){//详情页面
        //  console.log(item);
         globalBus.$emit("popss",item);  
        },
        pop(){//控制Moadl
           globalBus.$emit("pops",this.flag1);  
         },
        changetimes(ee){//INPUT查询
          this.todayDatesss= ee
          this.changetime()
        },
        changetime(){//封装请求
           getQueryMySimpleScheduleDate(
            {
                flag:this.flag,
                queryTime:this.todayDatesss
            }
            ).then((res)=>{
                console.log(res.data.data);
                this.schedulelist=res.data.data
            })
         },
         skip(){
            window.location.pathname = '/calendar';
         }
     },
     mounted () {
       this.changetime(),
       
       globalBus.$on("modificationlist",(schedulelist)=>{
            this.schedulelist = schedulelist
       });  
     }
 }
</script>
<style scoped>

.actives{
 /* background: url('../assets/img/person.png') no-repeat center;  */
}
.Calendar{
    height: 100%;
    position: relative;
}
.content{
  height: 256px;
  overflow-y: auto !important;
}

.contentkk{
  margin-bottom: 10px;
  display: flex;
  }
.contentkk .ark-input-wrapper.ark-input-wrapper-default.ark-input-type.ark-date-picker-editor{
      width: 150px !important;
      margin-left:10px;
  }
.contentkk .ark-date-picker{
   width: 100% !important;
   margin-left: 10px;

}
.calendarshows{
    width:100% ;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    

} 
.calendarshows:hover{
    cursor:pointer 
  }
/* .item>span{
 text-align: left;
    width: 52px;
    background: red;
} */
.items{
  height: 50px;
  width: 100%;
  line-height: 50px;
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  color: #313231;
 background: #F4F7FD;
 margin-bottom: 10px;
 border-left: 2px solid #3A7BF5;
}
.my{
font-family: PingFang SC;
font-size: 16px;
color: #4E4E4E;
text-align: left;
vertical-align: top;
font-weight: 600;
text-transform: none;
letter-spacing: 0px;
}
.ss{
     width: 150px;
     /* padding-left: 15px; */
  }
  .ark-col.ark-col-span-12{
    width: 100%;
  }
  .rc:hover{
    cursor:pointer 
  }
.rc{
position: absolute;
top: 0px;
right: 67px;
font-size: 14px;
color: #3A7BF5;
text-align: left;
vertical-align: top;
font-weight: 400;
}
.qb:hover{
  cursor:pointer 
}
.qb{
position: absolute;
right: 0px;
top: 0px;
font-size: 14px;
color:  #3A7BF5;
text-align: left;
vertical-align: top;
}
</style>