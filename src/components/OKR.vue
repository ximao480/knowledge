<template>
  <div class="Calendar">
    <div class="contentkk">
      <div class="my">我的OKR</div>
      <div class="Select">
        <template>   
       <Row>
         <Col span="12">
             <DatePicker type="month" size="small" placeholder="请选择日期" style="width: 300px" v-model="value7" @on-change="changemonth" ></DatePicker>
         </Col>
      </Row>
    </template>

      </div>
      <div class="qb" @click="examine">查看全部</div>
    </div>
    <div class="calendars">
      <div v-for="(item, index) in columns1" :key="index" class="itemss">
        <span>{{ item.okrInfo }}</span>
        <span>{{ item.okrDivide }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getOKR,SetOKR } from "../utils/api.js";
import moment from "moment";
export default {
  data() {
    return {
      flags:true,
      model9: "",
      modal1: false,//新增
      modal3: true,
      value7:"",//获取选择时间
      year:"2020",//转换年
      month:"4",//转换季度
      flag: false,
      schedulelist: [],
      columns1: [],//搜索数据列表
       
      
    };
  },
  methods: {
    changemonth(){
      setTimeout(() => {
       this.showOKR();    
      }, 1000);
    },
    examine(){
      this.$router.push('/DetailsPage') 
    },
  // 搜索okr
    showOKR() {
      if(this.value7 === ""){   
           let data={
            okrYear:this.year,
            okrQuarter:this.month
           }
           getOKR(data).then((res) => {
           console.log(res.data.data.arkOkrList)
          this.columns1=res.data.data.arkOkrList
          });
      }else{
          let html = moment(this.value7).format("YYYY-M")
          this.year = html.slice(0,4)
          let html3 = html.slice(5) 
          if(html3<=3){
            this.month="1"
          }else if(html3>3 && html3<=6){
            this.month="2"
          }else if(html3>6 && html3<=9){
            this.month="3"
          }else{
            this.month="4"
          }
            let data={
            okrYear:this.year,
            okrQuarter:this.month
           }
           getOKR(data).then((res) => {
           console.log(res.data.data.arkOkrList)
           this.columns1=res.data.data.arkOkrList
          });
      }
    },
  },
  mounted() {
    this.showOKR();
  },
};
</script>
<style scoped>
.modelokr{
   position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
  
.modalork {
  position: fixed;
  top: 45%;
  left: 20%;
  /* background: red; */
  width: 50px;
  width: 800px;
  height: 50px;
  padding: 5px 0px;
  /* background: #fff; */
}

.ark-input {
  height: 20px !important; 
  margin-left: 50px;
}
.Calendar {
  position: relative;
  overflow-y: auto !important;
}
.contentkk {
  display: flex;
}
.contentkk
  .ark-input-wrapper.ark-input-wrapper-default.ark-input-type.ark-date-picker-editor {
  width: 150px !important;
  margin-left: 10px;
}
.contentkk .ark-date-picker {
  width: 100% !important;
}

.calendars {
  margin-top: 10px;
}
.found {
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  color: blue;
  border-bottom: 1px solid #dfdfdf;
}
.found:hover {
  cursor: pointer;
}
.itemss {
  height: 50px;
  width: 100%;
  line-height: 50px;
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  color: #313231;
  justify-content: space-between;
  border-bottom: 1px solid #dfdfdf;
}
.my {
  font-family: PingFang SC;
  font-size: 16px;
  color: #4e4e4e;
  text-align: left;
  vertical-align: top;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0px;
}
.Select {
  margin-left: 10px;
  width: 300px;
}
.addOKR {
  position: absolute;
  right: 80px;
  top: 0px;
}
.qb {
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 14px;
  color: #a5a5a5;
  text-align: left;
  vertical-align: top;
}
</style>