<template>
  <div class="DetailsPage">
    <div class="Page">
      <div class="top">
      
          <template>   
          <Row>
           <Col span="12">
             <DatePicker type="month"  placeholder="请选择" style="width: 200px" v-model="value7" @on-change="changemonth" ></DatePicker>
           </Col>
          </Row>
        </template>
      </div>
      <div class="title">我的OKR</div>
      <div class="table-wrap">
        <template>
          <Table :columns="columns1" :data="data1" size="large">
            <template
              slot="action"
              slot-scope="{ row, index }"
            >
            <div style="width:250px;display: inline-block;">
               <Progress :percent="row.okrCompletePercent ? row.okrCompletePercent :0" status="active"  />
            </div>
            
              <div @click="amendProgressBar(row)" style="width:30px;display: inline-block; margin-left:100px; cursor: pointer;">
                <svg
                  t="1609040192219"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12457"
                  width="10px"
                  height="10px"
                >
                  <path
                    d="M511.488001 0.06592a401.087248 401.087248 0 0 0-402.303246 402.239246C109.184755 621.760754 412.800186 1024 511.488001 1024c98.687815 0 402.239246-402.239246 402.239246-621.694834 0-223.039582-179.199664-402.239246-402.239246-402.239246z m0 932.478251c-65.855877 0-329.151383-361.983321-329.151383-530.239005a327.743385 327.743385 0 0 1 329.151383-329.087383 327.743385 327.743385 0 0 1 329.087383 329.087383c0 168.255685-263.295506 530.303006-329.087383 530.303005z"
                    p-id="12458"
                  ></path>
                  <path
                    d="M511.488001 256.00144a146.687725 146.687725 0 0 0-146.303726 146.303726 146.687725 146.687725 0 0 0 146.303726 146.303725 146.687725 146.687725 0 0 0 146.239726-146.303725 146.687725 146.687725 0 0 0-146.239726-146.239726z m0 219.519588a73.343862 73.343862 0 0 1-73.151863-73.215862c0-40.191925 32.895938-73.087863 73.151863-73.087863 40.191925 0 73.087863 32.895938 73.087863 73.087863 0 40.255925-32.895938 73.151863-73.087863 73.151863z"
                    p-id="12459"
                  ></path>
                </svg>
              </div>
            </template>
          </Table>
        </template>
        <div class="found" @keydown.enter="enterAddOKR" v-if="flag" data="data1">
           <!-- <div style="display:inline-block">
              <Avatar icon="ios-person" src=""  shape="circle" style="width:28px; height: 28px ;">55</Avatar> 
              <span>{{data}}</span>

           </div> -->
             
          <div style="display:inline-block;margin-left:100px;margin-right:100px;width:60%;">
              <Input v-model="value4" type="text" size="large" :rows="2" placeholder="列如：让OKR成为团队管理方式，输入后回车创建" />
          </div>  
          <div  style="display:inline-block;width:100px;">
              <Input v-model="value3" type="text" size="large" :rows="2" placeholder="请输入分值" />
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
                color: blue;
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
          <p>完成度:</p>
          <div>
            <Input
              placeholder="0"
              v-model="value"
              style="width: 350px; height: 30px"
            />
            <span class="percentSign">%</span>
          </div>

          <p>状态:</p>
          <div>
            <RadioGroup v-model="animal" >
              <Radio label="正常"></Radio>
              <Radio label="有风险" style="margin-left: 50px"></Radio>
              <Radio label="以延期" style="margin-left: 50px"></Radio>
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
import { getOKR,SetORK } from "../utils/api.js";
import moment from "moment";

export default {
  data() {
    return {
      value3:"",//新增
      value4:"",//新增
      value7:"",//获取选择时间
      year:"2020",//转换年
      month:"4",//转换季度
      flag:false,
      value8:"",
      model9: "",
      value: "", //输入框
      animal: "", //单选框状态 
      value6:"",//文本域
      rowlist:[],//行数据
      isshowamendProgressBar: false,
      columns1: [
        {
          title: "人员",
          key: "NAME",
          render: (h, params) => {
            console.log(params.row);
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
                    style: {},
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
        },
        {
          title: "分值",
          key: "okrDivide",
        },

        {
          title: "进度",
          key: "okrCompletePercent",
          slot: "action"
        },

      ],
      data1: []//表格数据
    }
  },
  methods: {
//选择日期变化
  changemonth(){
   setTimeout(() => {
    this.showOKR();
      }, 1000);
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
          this.data1=res.data.data.arkOkrList
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
          this.data1=res.data.data.arkOkrList
          });
      }
       

      
    },
//回车添加
    enterAddOKR(){
       if(!this.value4){
        this.$Message.warning("请填写OKR");
        return 
      }else if (!this.value3) {
        this.$Message.warning("请输入分值");
        return 
      }else{
        this.flag = false;
        SetORK({
          id:null,
          okrInfo:this.value4,
          okrDivide:this.value3,
          okrQuarter:"4",
          okrYear:"2020"
          }).then(res=>{
            this.showOKR()
            this.value4=""
            this.value3=""
          })
      }
     },
// 点击svg，
    amendProgressBar(row) {
      this.rowlist = row//获取点击svg 的row数据
      console.log(row);
// 控制数据回显
      this.value= row.okrCompletePercent
       if(row.okrStatues==="1"){
            this.animal="正常"
        }else{
            this.animal= row.okrStatues==="2" ? "有风险":"已延期"
        }
        this.value6=row.okrEvolve
      this.isshowamendProgressBar = true;
    },

// 修改弹框确定按钮
    ScheduleOk(){
      if(!this.value){
      this.$Message.warning("请输入完成度！");
      } else if(this.value>100){
      this.$Message.warning("进度最高100%！");
      }else if(!this.animal){
       this.$Message.warning("请选择抓状态！");
      }else if(!this.value6){
       this.$Message.warning("请输入进展！");
      }else{
           console.log(this.rowlist);
          if(this.animal==="正常"){
            this.animal=1
          }else{
            this.animal= this.animal==="有风险" ? 2:3
          }

        SetORK({
          id:this.rowlist.ID,
          okrCompletePercent:this.value,
          okrStatues:this.animal,
          okrEvolve:this.value6,
          }).then(res=>{
            this.showOKR()
            this.isshowamendProgressBar=false
             this.value = "",
             this.animal = "",
             this.value6 =""
          })

       
      }
    },
// 取消按钮
    ScheduleCancel(){
      this.isshowamendProgressBar=false
        this.value = "",
        this.animal = "",
        this.value6 =""
    },
//点击弹出增加输入框
    addORK(){
      this.flag=true
    },
  },
  mounted() {
  //  this.showOKR()
  },
};
</script>

<style scoped>

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
.percentSign {
  position: absolute;
  top: 40px;
  left: 326px;
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
</style>
