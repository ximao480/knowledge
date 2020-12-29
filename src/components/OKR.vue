<template>
  <div class="Calendar">
    <div class="contentkk">
      <div class="my">我的OKR</div>
      <div class="Select">
        <template>
          <Cascader :data="data"  v-model="value1"  size="small" @on-change="changemonth"></Cascader>
       </template>
        <!-- <template>   
       <Row>
         <Col span="12">
             <DatePicker type="month" size="small" placeholder="请选择日期" style="width: 300px" v-model="value7" @on-change="changemonth" ></DatePicker>
         </Col>
      </Row>
    </template> -->

      </div>
      <div class="qb" @click="examine">查看全部</div>
    </div>
    <div class="calendars">
      <div v-for="(item, index) in columns1" :key="index" class="itemss">
        <span>{{ item.okrInfo }}</span>
           <div style="display:inline-block;width: 200px;">
           <Progress :percent="item.okrCompletePercent ? item.okrCompletePercent :0" status="active"  />
           </div>
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
      value1: [],//季度
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
       data: [{
               value: '2020',
               label: '2020年',
               children: [     
                        {
                           
                            value: '1',
                            label: '第一季度'
                        },
                        {
                            value: '2',                         
                            label: '第二季度'
                        },
                        {
                            value: '3',
                            label: '第三季度'
                        },
                        {
                            value: '4',
                            label: '第四季度'
                        }
                    ]
              }
        ]
    };
  },
  methods: {
    changemonth(ev){
      setTimeout(() => {
       this.showOKR();    
      }, 1000);
    },
    examine(){
      this.$router.push('/DetailsPage') 
    },
  // 搜索okr
    showOKR() {
      if(this.value1.length === 0){   
           let data={
            okrYear:this.year,
            okrQuarter:this.month
           }
           getOKR(data).then((res) => {
           console.log(res.data.data.arkOkrList)
          this.columns1=res.data.data.arkOkrList
          });
      }else{
    
            let data={
            okrYear:this.value1[0],
            okrQuarter:this.value1[1]
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
  height: 100%;
  margin-top: 10px;
  overflow-y: auto !important;
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
  width: 150px;
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
.qb:hover {
  cursor: pointer;
}
</style>