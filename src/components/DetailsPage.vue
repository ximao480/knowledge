<template>
  <div class="DetailsPage">
    <div class="Page">
      <div class="top">
        <!-- <template>
          <Cascader :data="data"  v-model="value7"  size="small" @on-change="changemonth"></Cascader>
       </template> -->
         <template>
          <Select v-model="value7" size="small"  @on-change="changemonth">
           <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
       </template>
      </div>
      <div class="title">我的OKR</div>
      <div class="table-wrap">
        <template>
          <Table :columns="columns1" :data="data1" size="large">
            
             <template
              slot="okrInfo"
              slot-scope="{ row, index }"
            > 
             <div style='width:300px;display: inline-block;word-wrap:break-word;margin-right:20px'>
               <div style='display:inline-block;margin-right:10px;width:200px;overflow: hidden;margin-bottom: -5px;'>
                    {{row.okrInfo}}
               </div>
              <!-- border:1px solid #ccc; -->
                 <div style='width:60px;height:20px ;text-align: center;border-radius: 15px;display: inline-block;'
                  :class="[{'actives1':row.okrStatues==='1'},{'actives2':row.okrStatues==='2'},{'actives3':row.okrStatues==='3'}]" v-html='zthtml(row)' >
                
                  </div>
                   <!-- <div style='height:40px ;display: inline-block;' v-html='zthtml(row)'></div> -->
              </div>
             
            </template>
             

            <template
              slot="action"
              slot-scope="{ row, index }"
            >
            <div style="width:200px;display: inline-block;">
               <Progress :percent="row.okrCompletePercent ? Number(row.okrCompletePercent) :0" status="active"  />
            </div>
            
              <div @click="amendProgressBar(row)" style="width:30px;display: inline-block; margin-left:30px; cursor: pointer;">
                <Tooltip content="更新OKR完成度" placement="top">
              <svg t="1609149234998" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8242" width="200" height="200"><path d="M509.333333 332.266667c-57.6 0-101.333333 43.733333-101.333333 101.333333s43.733333 101.333333 101.333333 101.333333 101.333333-43.733333 101.333334-101.333333-43.733333-101.333333-101.333334-101.333333z" p-id="8243"></path><path d="M871.466667 275.2c-19.733333-48-48-87.466667-84.8-121.6-36.8-34.133333-76.266667-62.4-124.266667-82.133333-48-19.733333-99.2-30.933333-152.533333-30.933334C456 40.533333 405.333333 49.066667 357.333333 71.466667c-48 19.733333-90.666667 48-124.266666 82.133333S167.466667 229.866667 147.2 275.2c-19.733333 48-30.933333 99.2-30.933333 149.866667 0 76.266667 19.733333 147.2 53.866666 220.266666 28.266667 56.533333 67.733333 113.066667 118.933334 166.933334 84.8 90.666667 175.466667 147.2 200.533333 161.066666 5.866667 5.866667 17.066667 5.866667 22.4 5.866667 8.533333 0 17.066667-2.666667 22.4-5.866667 25.6-14.4 115.733333-70.933333 200.533333-161.066666 48-53.866667 90.666667-110.4 118.933334-166.933334 34.133333-70.933333 53.866667-147.2 53.866666-220.266666-5.333333-50.666667-13.866667-101.866667-36.266666-149.866667z m-362.133334 345.066667c-104.533333 0-186.666667-82.133333-186.666666-186.666667s82.133333-186.666667 186.666666-186.666667 186.666667 82.133333 186.666667 186.666667-82.133333 186.666667-186.666667 186.666667z" p-id="8244"></path></svg>
               </Tooltip>
              </div>
             
            </template>
          </Table>
        </template>
        <div class="found" @keydown.enter="enterAddOKR" v-if="flag">
          <div style="display:inline-block;margin-left:100px;width:60%;">
              <Input v-model="value4" type="text" size="large" :rows="2" placeholder="例如：让OKR成为团队管理方式，输入后回车创建" />
          </div>  
          <div  style="display:inline-block;width:100px;margin-left:100px">
             
              <Input v-model="value3" :max="100"  :min='1' size="large" :rows="2" placeholder="请输入分值" />
          </div>
           
        </div>
        <div >
          <div class="found" @click="addORK" ref="foundORK">
            <svg
              class="icon"
              aria-hidden="true"
              style="
                width: 15px;
                height: 15px;
                color: #3A7BF5;
                margin: 0 2px 0px 5px;
                vertical-align: text-bottom;
              "
            >
              <use :xlink:href="'#' + 'iconios-add-circle'" />
            </svg>
            创建OKR
          </div>
        </div>
      </div>
    </div>
    <div>
      <Modal
        v-model="isshowamendProgressBar"
        title="新增OKR完成度"
        :closable="true"
        :footer-hide="true"
      >
        <div class="wcd">
          <p>完成分值:</p>
          <div>
           <Input  placeholder="0" v-model="value2"  style="width: 350px; height: 30px" :min='1' size="large" :rows="2" />
          </div>

          <p>状态:</p>
          <div>
            <RadioGroup v-model="animal" >
              <Radio label="正常"></Radio>
              <Radio label="有风险" style="margin-left: 50px"></Radio>
              <Radio label="已延期" style="margin-left: 50px"></Radio>
            </RadioGroup>
          </div>
           <p>进展:</p>
           <div class="textarea">
                <Input v-model="value6" type="textarea" :rows="3" placeholder="请输入进展" />
           </div>
        </div>
        <div class="SchedulePopUpModal-footer">
          <Button
            type="fcdefault"
            @click="ScheduleCancel"
            style="margin-right: 10px; width: 60px; height: 30px"
            >取消</Button
          >
          <Button
            type="primary"
            style="margin-right: 10px; width: 60px; height: 30px"
            @click="ScheduleOk"
            >确定</Button
          >
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
import { getOKR,SetOKR,Delete } from "../utils/api.js";
import moment from "moment";

export default {
  data() {
    return {
      value3:'',//新增
      value4:"",//新增 
      year:"2020",//转换年
      month:"4",//转换季度
      flag:false,
      value8:"",
      model9: "",
      value2: '', //输入框  
      score:'',
      animal: "正常", //单选框状态 
      value6:"",//文本域
      rowlist:[],//行数据
      isshowamendProgressBar: false,
      value7:'4',//获取选择时间
      cityList: [
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
                   
                ],
      columns1: [
        {
          title: "人员",
          key: "NAME",
          render: (h, params) => {
            // console.log(params.row);
            return h(
              "div",
              {
                style: {
                  width: "100px",
                },
              },
              [
                //------- 后期优化头像----
                // h(
                //   "Avatar",
                //   {
                //     props: {
                //       shape: "circle",
                //       src: params.row.AVATAR_URL,
                //     },
                //     style: {
                //       width: "28px",
                //       height: "28px",
                //       "margin-right": "8px",
                //       "line-height": "28px",
                //       display: params.row.AVATAR_URL ? "inline-block" : "none",
                //     },
                //   },
                //   "xcscd"
                // ),
                // h(
                //   "Avatar",
                //   {
                //     props: {
                //       shape: "circle",
                //       src: params.row.AVATAR_URL,
                //     },
                //     style: {
                //       width: "28px",
                //       height: "28px",
                //       "margin-right": "8px",
                //       "margin-bottom": "8px",
                //       "padding-top": "8px",
                //       "line-height": "28px",
                //       background: "#3D7EFF",
                //       display: !params.row.AVATAR_URL ? "inline-block" : "none",
                //     },
                //   },
                //   params.row.ownerename.substring(0, 1)
                // ),
                h(
                  "span",
                  {
                    style: {
                      
                    },
                  },
                  params.row.ownerename
                ),
              ]
            );
          },
        },
        {
          title: "OKR",
          key: "okrInfo",
          slot:"okrInfo"
        },
        {
          title: "目标分值",
          key: "okrDivide",
        },

        {
          title: "进度",
          key: "okrCompletePercent",
          slot: "action"
        },
        {
          title: "操作",
          key: "Delete",
          render: (h, params) => {
            return h('div',{
              style:{
                width:'50px',
                height:'50px',
                color:" #3A7BF5",
                "padding-top": "14px",
                cursor: "pointer"
              },
              class:{//添加类名
                    delete:true//布尔值控制类名是否添加//true添加//flase不添加
                },
               on: {
                    click: () => {
                    this.Deletes(params)
                    }
                  }
            },'删除')
          }
        },

      ],
      data1: []//表格数据
    }
  },
  computed: {
    zthtml(data){
      return (data)=>{
      //  console.log(data);
       if(data.okrStatues==='1'){
         return '正常'
       }else if(data.okrStatues==='2'){
          return '有风险'
       }else if(data.okrStatues==='3'){
        return '已延期'
      }
       
      }
    }
  },
  methods: {
// 删除
  Deletes(row){
          // console.log(row.row);
        if(row.row.okrQuarter<4){
        this.$Message.warning("该季度数据不能删除");
        }else{
            Delete({
                id:row.row.ID
              }).then(res=>{
                // console.log(res);
                 this.$Message.success('删除成功');
                this.showOKR()
              })
        }
  },
//选择日期变化
  changemonth(){
   setTimeout(() => {
    this.showOKR();
      }, 1000);
  },
// 搜索okr
     showOKR() {
            let data={
            okrYear:this.year,
            okrQuarter:this.value7
           }
           getOKR(data).then((res) => {
          //  console.log(res.data.data.arkOkrList)
          this.data1=res.data.data.arkOkrList
          });
    },
//回车添加
    enterAddOKR(){
    
        let num = Number(this.value3)
        let zt= isNaN(num)
         
       if(!this.value4){
        this.$Message.warning("请填写OKR");
        return 
      }else if (!this.value3) {
        this.$Message.warning("请输入分值");
        return 
      }else if(zt){
        this.$Message.warning("请重新输入分值，类型为数值！");
         return 
      }
      else if(this.value3>100){
        this.$Message.warning("分值不能大于100");
         return 
      }
      else{
        this.flag = false;
        SetOKR({
          id:null,
          okrInfo:this.value4,
          okrDivide:this.value3,
          okrQuarter:this.value7,
          okrYear:"2020"
          }).then(res=>{
              this.$Message.success("cccc");
            if(res.data.code===0){
              this.$Message.success(res.data.message);
              this.showOKR()
              this.value4=""
              this.value3=""
            
            }else{
              this.$Message.error(res.data.message);
                this.showOKR()
                this.value4=""
                this.value3=""
            }
          
          })
      }
     },
// 点击svg，
    amendProgressBar(row) {
       if(row.okrQuarter<4){
           this.isshowamendProgressBar = false;
           this.$Message.warning("该季度数据不能修改");
       }else{

      this.rowlist = row//获取点击svg 的row数据
// 控制数据回显
      //  console.log(this.rowlist);
      this.value2= row.okrCompleteDivide
       if(row.okrStatues==="1"){
            this.animal="正常"
        }else{
            this.animal= row.okrStatues==="2" ? "有风险":"已延期"
        }
        this.value6=row.okrEvolve
        this.isshowamendProgressBar = true;
       }
      
 
    },

// 修改弹框确定按钮
    ScheduleOk(){
        let num = Number(this.value2)
        let zt= isNaN(num)

      if(!this.value2){
      this.$Message.warning("请输入完成度！");
      } else if(this.value2>this.rowlist.okrDivide){
      this.$Message.warning("完成度不能超过设定值！");
      } 
      else if(zt){
      this.$Message.warning("请重新输入分值，类型为数值！");
      } 
      else if(!this.animal){
       this.$Message.warning("请选择状态！");
      }else if(!this.value6){
       this.$Message.warning("请输入进展！");
      }else{
          //  console.log(this.rowlist);
          if(this.animal==="正常"){
            this.animal=1
          }else{
            this.animal= this.animal==="有风险" ? 2:3
          }
        //  let percentage = this.value2/this.rowlist.okrDivide*100
        //  console.log(percentage);
        //  let num = Number(this.value2)
         let num =  +parseFloat(this.value2).toFixed(2)
      
        //  console.log(this.rowlist);   
        SetOKR({
          id:this.rowlist.ID,
         // okrCompletePercent:percentage,//百分比
          okrCompleteDivide:num,//完成分值
          okrDivide:this.rowlist.okrDivide,//目标分值
          okrStatues:this.animal,
          okrEvolve:this.value6,
          }).then(res=>{
            this.showOKR()
            this.isshowamendProgressBar=false
             this.value2 = "",
             this.animal = "",
             this.value6 =""
          })

       
      }
    },
// 取消按钮
    ScheduleCancel(){
      this.isshowamendProgressBar=false
        this.value2 = "",
        this.animal = "",
        this.value6 =""
    },
//点击弹出增加输入框
    addORK(){
        if(this.value7<4){
        this.$Message.warning("该季度不能增加数据");
        }else{
           this.flag=true
        }
     
    },
  },
  mounted() {
   this.showOKR()
  },
};
</script>

<style scoped>
.actives1{
  /* border:lpx solid red !important;*/
  border:1px solid #3a7bf5; 
  color:#3a7bf5 ;
}
.actives2{
  /* border:lpx solid red !important;*/
  border:1px solid #EFE088; 
  color:#EFE088 ;
}
.actives3{
  /* border:lpx solid red !important;*/
  border:1px solid #B93835; 
  color:#B93835 ;
}

.ark-input-number.ark-input-number-large{
 width: 100px;
}
.wcd {
  margin-top: 20px;
  margin-left: 80px;
  font-size: 14px;
  color: #333333;
  text-align: left;
  position: relative;
}
.wcd > div {
  margin: 20px 0 20px 0;
}
.textarea{
  width: 350px;
}
/* .percentSign {
  position: absolute;
  top: 40px;
  left: 326px;
} */
.found {
  height: 50px;
  width: 100%;
  line-height: 50px;
  font-size: 14px;
  color: #3A7BF5;
  border-bottom: 1px solid #dfdfdf;
}
.found:hover {
  cursor: pointer;
}
/* .delete:hover {
  cursor: pointer !important;
} */
.ark-table-wrapper {
  border: none;
}
.DetailsPage {
 /* background: url('../assets/img/person.png') no-repeat center;  */
  
  padding: 10px;
  height: 100%;
  width: 100%;
}
.Page {
  width: 100%;
  height: 100%;
  padding: 20px 0 0 24px;
  background: #fff;
  overflow-y: auto;
}
.top {
  width: 150px;
  margin-bottom: 40px;
}
.title {
  margin-bottom: 20px;
  font-family: PingFang SC;
  font-size: 16px;
  color: #4e4e4e;
  text-align: left;
  vertical-align: top;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0px;
}
.SchedulePopUpModal-footer{
    border-top: 1px solid #ccc;
}
div.ark-table-cell.ark-table-cell-ellipsis{
  width: 300px !important;
}
.ark-table-row>td:nth-of-type(2){
    width: 300px !important;
}
</style>
