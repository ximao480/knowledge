<template>
  <div class="Moadl">
    <Modal
      v-model="SchedulePopUpModal"
      :title="SchedulePopUpModalTitle"
      :closable="true"
      :mask="true"
      :footer-hide="true"
      width="400"
    >
      <div class="newaddschedule">
        <div class="schedule_item">
          <span>日程名称:</span>
          <Input
            v-model="scheduleName"
            style="width: 300px"
            :maxlength="40"
          ></Input>
        </div>
        <div class="schedule_item">
          <span>日程时间:</span>
          <div>
            <DatePicker
              type="datetime"
              v-model="scheduleStartTime"
              placeholder="开始时间"
              style="width: 142px"
            ></DatePicker>
            <span> - </span>
            <DatePicker
              type="datetime"
              v-model="scheduleEndTime"
              placeholder="结束时间"
              style="width: 142px"
            ></DatePicker>
          </div>
        </div>
        <div class="schedule_item">
          <span>参与者:</span>
          <Collaborators
            @on-change="getSchedulePeople"
            ref="CollaboratorsRef"
            style="width: 300px"
          />
        </div>
        <div class="schedule_item">
          <div style="width: 300px">
            <Checkbox v-model="scheduleNailingNotice">钉钉通知</Checkbox
            >&nbsp;&nbsp;
            <Checkbox v-model="scheduleOpen">公开</Checkbox>&nbsp;&nbsp;
            <Checkbox v-model="scheduleParticipantsCanEdited"
              >参与者可编辑</Checkbox
            >
          </div>
        </div>
        <div class="schedule_item" v-show="scheduleNailingNotice">
          <span>提醒:</span>
          <Select v-model="scheduleRemind" style="width: 300px">
            <Option
              v-for="item in scheduleRemindList"
              :value="item.id"
              :key="item.value"
              >{{ item.desc }}</Option
            >
          </Select>
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



    <!-- --------------------------------------------------------详情页Modal ----------------------------------------------->
    <Modal
      v-model="ScheduleReadPopUpModal"
      width="330"
      :mask="true"
      :footer-hide="true"
    >
      <div class="ScheduleReadHeader">
        <div class="ScheduleReadHeaderAction">
          <span
            @click="ScheduleReadAction('edit', queryScheduleDate)"
            v-show="
              queryScheduleDate.createId == userinfo.id
                ? true
                : queryScheduleDate.isEditable == 1
            "
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
                color: white;
              "
              fill="white"
            >
              <use :xlink:href="'#' + 'iconbj_listedit'" />
            </svg>
          </span>
           <span
            @click="ScheduleReadAction('delete', queryScheduleDate)"
            v-show="queryScheduleDate.createId == userinfo.id"
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
                color: white;
              "
              fill="white"
            >
              <use :xlink:href="'#' + 'iconbj_delete'" />
            </svg>
          </span> 
           <span @click="ScheduleReadAction('close', queryScheduleDate)">
            <svg
              class="icon"
              aria-hidden="true"
              style="
                width: 16px;
                height: 16px;
                vertical-align: text-bottom;
                color: white;
              "
              fill="white"
            >
              <use :xlink:href="'#' + 'iconmd-close'" />
            </svg>
          </span>
         </div>
        <div class="ScheduleReadHeaderTitle">
          <span class="ScheduleReadHeaderTitle_title">{{
            queryScheduleDate.title
          }}</span>
          <span
            >{{ queryScheduleDate.startTime }} -
            {{ queryScheduleDate.endTime }}</span
          >
        </div>
      </div>

      <div class="ScheduleReadContent">
        <div class="ScheduleRead_item">
          <span>创建者:</span>
          <ul>
            <li class="Schedule_Creator">
              <img
                :src="queryScheduleDate.createImg"
                v-if="queryScheduleDate.createImg"
                alt=""
              />
              <Avatar size="small" style="background-color: #3a7bf5" v-else>
                {{ queryScheduleDate.createName }}
              </Avatar>
              <span>{{ queryScheduleDate.createName }}</span>
            </li>
          </ul>
        </div>
        <div class="ScheduleRead_item">
          <span
            >参与者（{{
              queryScheduleDate.addScheduleParticipateList
                ? queryScheduleDate.addScheduleParticipateList.length
                : 0
            }}人）:</span
          >
          <ul>
            <li
              v-for="(
                item, index
              ) in queryScheduleDate.addScheduleParticipateList"
              :key="index"
              class="Schedule_participant"
            >
              <img :src="item.participanImg" alt="" v-if="item.participanImg" />
              <Avatar size="small" style="background-color: #3a7bf5" v-else>
                {{ item.participanName.substr(0, 1) }}
              </Avatar>
              <span>{{ item.participanName }}</span>
            </li>
          </ul>
        </div>
        <div class="ScheduleRead_item">
          <span
            >通知:&nbsp;&nbsp;<span style="color: #4e4e4e">{{
              queryScheduleDate.dictionaryDesc
            }}</span></span
          >
        </div>
        <div class="ScheduleRead_item">
          <div style="width: 300px">
            <Checkbox
              :value="this.queryScheduleDate.isNotice == 1 ? true : false"
              :disabled="true"
              >钉钉通知</Checkbox
            >&nbsp;&nbsp;
            <Checkbox
              :value="this.queryScheduleDate.isOpen == 1 ? true : false"
              :disabled="true"
              >公开</Checkbox
            >&nbsp;&nbsp;
            <Checkbox
              :value="this.queryScheduleDate.isEditable == 1 ? true : false"
              :disabled="true"
              >参与者可编辑</Checkbox
            >
          </div>
        </div> 
         <div
          class="ScheduleRead_footer"
          v-show="queryScheduleDate.createId !== userinfo.id && !subscriber"
          v-if="isShowSchedule"
        >
          <div
            class="ScheduleRead_footer_item"
            style="border-right: 1px solid #f0f0f0"
            @click="ScheduleAccept(queryScheduleDate)"
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="width: 16px; height: 16px; vertical-align: text-bottom"
            >
              <use :xlink:href="'#' + 'iconios-checkmark-circle-outline'" />
            </svg>
            接受
          </div>
          <div
            class="ScheduleRead_footer_item"
            @click="ScheduleRefuse(queryScheduleDate)"
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="width: 16px; height: 16px; vertical-align: text-bottom"
            >
              <use :xlink:href="'#' + 'iconios-refuse-outline'" />
            </svg>
            拒绝
          </div> 
        </div>
      </div>
    </Modal>
     
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { globalBus, updateTimeById } from "../utils/bus.js";
import { getoPtions,addScheduleDate,getqueryScheduleDate,getQueryMySimpleScheduleDate} from "../utils/api.js";
import moment from "moment";
import Collaborators from "./Collaborators.vue";
export default {
  components: {
    Collaborators,
  },
  data() {
    return {
        flag:"1",
        todayDatesss: moment(new Date()).format("YYYY-MM-DD hh:mm:ss"),
      SchedulePopUpModal: false,
      //input v-model
      scheduleName: "",
      scheduleStartTime: "",
      scheduleEndTime: "",
      scheduleNailingNotice: true, //钉钉通知//提醒show
      scheduleRemindList: "", //钉钉option
      scheduleOpen: true, //公开
      scheduleParticipantsCanEdited: false, //参与者
      scheduleRemind: "", //选择器
      addScheduleParticipateList: [],
      SchedulePopUpModalTitle: "新建日程",

      ScheduleReadPopUpModal:false,
      isShowSchedule: false,
      // queryScheduleDate:{},
      userinfo: JSON.parse(window.localStorage.getItem("userInfoShare")),
    };
  },
  // props:['SchedulePopUpModal'],
  methods: {

    // 预览模式下的action操作
  ScheduleReadAction(action, config) {
      if (action == "edit") {
        this.ScheduleReadPopUpModal = false;
        this.SchedulePopUpModal = true;
        this.SchedulePopUpModalTitle = "编辑日程";
        this.scheduleName = this.queryScheduleDate.title; //名称
        this.scheduleStartTime = this.queryScheduleDate.startTime; //开始时间
        this.scheduleEndTime = this.queryScheduleDate.endTime; //结束时间
        console.log(this.scheduleStartTime, this.scheduleEndTime);
        this.scheduleOpen = this.queryScheduleDate.isOpen == 1 ? true : false; //是否公开
        this.scheduleNailingNotice =
          this.queryScheduleDate.isNotice == 1 ? true : false; // 是否提醒
        this.scheduleParticipantsCanEdited =
          this.queryScheduleDate.isEditable == 1 ? true : false; // 参与者是否可编辑
        this.scheduleRemind = this.queryScheduleDate.dictionaryId;
        let ScheduleParticipateList = this.queryScheduleDate.addScheduleParticipateList.map(
          (item, index) => ({
            NAME: item.participanName,
            USERS_ID: item.participantId,
          })
        );
        setTimeout(() => {
          this.$refs.CollaboratorsRef.selectList = ScheduleParticipateList;
        }, 100);
      } else if (action == "delete") {
        this.$Modal.warning({
          title: "提示",
          closable: true,
          content: "是否删除",
          cancelType: true,
          titleAlign: "left",
          mask: true,
          draggable: true,
          onOk: () => {
            this.deleteScheduleDate({
              id: config.id,
            }).then((res) => {
            this.ScheduleReadPopUpModal = false;
              getQueryMySimpleScheduleDate(
            {
                flag:this.flag,
                queryTime:this.todayDatesss
            }
            ).then((res)=>{
                globalBus.$emit("modificationlist",res.data.data);  
            })
            });
          },
        });
      } else if (action == "close") {
        this.ScheduleReadPopUpModal = false;
      }
    },
   ScheduleAccept(config) {//接受
      this.setAccept({
        pId: config.addScheduleParticipateList[0].pId,
        status: 1,
      }).then((res) => {
        console.log(res);
      });
      this.ScheduleReadPopUpModal = false;
    },
    ScheduleRefuse(config) {//拒绝
      this.setAccept({
        pId: config.addScheduleParticipateList[0].pId,
        status: 2,
      }).then((res) => {
        this.getQueryMySimpleScheduleDate({
          flag: this.flag, //日周月标识，1日 2周 3月
          queryTime: this.todayDate, //2020-12-05 00:00:00 查询时间
        });
      });
      this.ScheduleReadPopUpModal = false;
    },





    getSchedulePeople(data) {
      //获取参会人
      //  console.log(data);
      this.addScheduleParticipateList = data.map((item, index) => ({
        participantId: item.USERS_ID,
        participanName: item.NAME,
        participanImg: item.AVATAR_URL || "",
      }));
    },
    // 取消
    ScheduleCancel() {
      //取消新增计划事件
      this.SchedulePopUpModal = false;
    },
    ScheduleOk() {
      //确定事件
      if (!this.scheduleName) {
        this.$Message.warning("请填写日程名称！");
        return true;
      } else if (!this.scheduleStartTime || !this.scheduleEndTime) {
        this.$Message.warning("请填写开始时间或结束时间！");
        return true;
      } else if (
        this.scheduleEndTime.getTime() < this.scheduleStartTime.getTime()
      ){
        this.$Message.warning("结束时间要大于开始时间！");
        return true;
      } else if (this.scheduleNailingNotice && !this.scheduleRemind) {
        this.$Message.warning("请选择提醒！");
        return true;
      } else {
        this.SchedulePopUpModal = false;
          if (this.SchedulePopUpModalTitle == "编辑日程") {
          this.updateScheduleDate({
            id: this.queryScheduleDate.id,
            title: this.scheduleName, //日程名称
            startTime: moment(this.scheduleStartTime).format(
              "YYYY-MM-DD HH:mm:ss"
            ), //日程开始时间
            endTime: moment(this.scheduleEndTime).format("YYYY-MM-DD HH:mm:ss"), //日程结束时间
            isNotice: this.scheduleNailingNotice ? 1 : 2, //是否钉钉通知1通知 2不通知
            isOpen: this.scheduleOpen ? 1 : 2, //是否公开 1公开 2不公开
            isEditable: this.scheduleParticipantsCanEdited ? 1 : 2, //参与者是否可以编辑 1可编辑 2不可编辑
            dictionaryId: this.scheduleNailingNotice ? this.scheduleRemind : "", //字典id
            addScheduleParticipateList: this.addScheduleParticipateList,
          }).then((res) => {
             getQueryMySimpleScheduleDate(
            {
                flag:this.flag,
                queryTime:this.todayDatesss
            }
            ).then((res)=>{
                 alert("修改更新完毕")
                // console.log(res.data.data);
                globalBus.$emit("modificationlist",res.data.data);  
            })
          });
        } else {
          addScheduleDate({
            title: this.scheduleName, //日程名称
            startTime: moment(this.scheduleStartTime).format(
              "YYYY-MM-DD HH:mm:ss"
            ), //日程开始时间
            endTime: moment(this.scheduleEndTime).format("YYYY-MM-DD HH:mm:ss"), //日程结束时间
            isNotice: this.scheduleNailingNotice ? 1 : 2, //是否钉钉通知1通知 2不通知
            isOpen: this.scheduleOpen ? 1 : 2, //是否公开 1公开 2不公开
            isEditable: this.scheduleParticipantsCanEdited ? 1 : 2, //参与者是否可以编辑 1可编辑 2不可编辑
            dictionaryId: this.scheduleNailingNotice ? this.scheduleRemind : "", //字典id
            addScheduleParticipateList: this.addScheduleParticipateList,
          }).then((res) => {
              // alert("添加成功");
            // this.getQueryMySimpleScheduleDate({
            //   flag: this.flag, //日周月标识，1日 2周 3月
            //   queryTime: this.todayDate, //2020-12-05 00:00:00 查询时间
            // });
              getQueryMySimpleScheduleDate(
            {
                flag:this.flag,
                queryTime:this.todayDatesss
            }
            ).then((res)=>{
                //  alert("增加更新完毕")
                // console.log(res.data.data);
                globalBus.$emit("modificationlist",res.data.data);  
            })
          });
        }

      }
    },

      ...mapActions([
      "setweekendsVisible",
      //
      "getAdvanceDate",
      "addScheduleDate", //新增日程信息
      "getQueryMySimpleScheduleDate", //获取我的全部日程
      "getQuerySimpleScheduleDate", //获取用户的全部日程
      "deleteScheduleDate", //删除当前日程
      "getSubscribeDate", //
      "GRTQUERYScheduledate", //获取当前事项的基本信息
      "setAccept", //是否订阅
      "subscribeDate", //订阅
      "updateScheduleDate", //更新日程信息
      "updateTimeById",//更新日程信息
    ]),
  },
  computed: {
    ...mapGetters([
      "weekendsVisible",
      "querymysimplescheduleDate",
      "querysimplescheduleDate",
      "getsubscribeDate",
      "subscribeData", //订阅
      "queryScheduleDate",
    ]),
  },
  mounted() {
    // 获取详情信息
    console.log(this.queryScheduleDate);
    globalBus.$on("popss", (data) => {
      // console.log(data);
       this.ScheduleReadPopUpModal = true;
       this.GRTQUERYScheduledate(data)
      
    });
    // 增加dalog
    globalBus.$on("pops", (data) => {
      console.log(data);
      this.SchedulePopUpModal = data;
    });
    getoPtions().then((res) => {
      this.scheduleRemindList = res.data.data;
    });
  },
};
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100vh;
}

body {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
</style>

<style lang="less" scoped >
.calendar_box {
  display: flex;
  overflow: hidden;
  height: 100%;
  background-color: #eceef1;
  padding: 10px 15px;
  position: relative;
  width: 100%;
  .ark-modal-body {
    padding: 0px !important;
  }
}

.calendar {
  flex: 1;
  padding: 1em;
  margin-left: 16px;
  background-color: white;
  border-radius: 4px;
}
.calendar_action {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .calendar_action_subscribe,
  .calendar_action_newadd {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #2d8cf0;
    color: #fff;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }
  .calendar_action_newadd {
    font-size: 32px;

    span {
      margin-bottom: 2px;
    }
  }
}
.newaddschedule {
  display: flex;
  flex-direction: column;
  align-items: center;
  .schedule_item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 15px;
    span {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
    }
  }
}
.SchedulePopUpModal-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 15px;
}

.ScheduleReadHeader {
  height: 100px;
  background-image: url("http://ark-share.oss-cn-shanghai.aliyuncs.com/office-setting/calendar_bj.png");
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 100% 100%;
  .ScheduleReadHeaderTitle {
    margin-top: 8px;
    .ScheduleReadHeaderTitle_title {
      font-weight: 600;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    > span {
      margin-top: 4px;
    }
  }

  .ScheduleReadHeaderAction {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    span {
      display: block;
      padding: 5px 6px;
    }
    span:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .ScheduleReadHeaderTitle {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 10px 15px;
    color: white;
  }
}
.ScheduleReadContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // padding: 10px 15px;
  .ScheduleRead_item {
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    > span {
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;
    }
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      .Schedule_participant {
        span {
          margin-left: 4px;
        }
      }
      .Schedule_Creator {
      }
      li {
        padding: 6px 8px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }
  }
  .ScheduleRead_footer {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #f0f0f0;
    justify-content: space-between;
    .ScheduleRead_footer_item {
      cursor: pointer;
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 8px;
      margin-bottom: 8px;
      padding: 5px 15px;
      font-size: 14px;
    }
  }
}
</style>
