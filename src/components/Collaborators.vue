<template>
  <div class="add-collaborators">
    <div class="show-person">
      <span
        class="labelitem"
        v-for="(item, index) in selectList"
        :key="`id_${index}`"
      >
        {{ item.NAME
        }}<svgIcon
          :iconClass="'iconbj_delete2'"
          style="vertical-align: middle; width: 12px; height: 12px"
          @click.native="deleteItem(index)"
        />
      </span>
      <div class="input-wrap">
        <Input
          placeholder="可用用户名模糊搜索"
          class="search-box"
          v-model="setValue"
          @on-change="onChange"
        />
      </div>
      <!-- </div> -->
      <i
        :class="`iconfont iconorg ${iconClass}`"
        @click="clickIcon"
        style="vertical-align: top"
      ></i>
    </div>
    <ul class="float-search-people" v-if="showDataControl === 'searchPeople'">
      <li v-if="peopleList.length < 1">没有数据</li>
       <li
        v-for="(item, index) in peopleList"
        :key="index"
        class="people-item"
        @click="clickitem(item)"
      >
       <span class="user-message">
          <Avatar
            class="avatar"
            style="background: #3a7bf5"
            v-if="!item.AVATAR_URL"
            >{{ item.NAME.substr(0, 1) }}</Avatar
          > 
           <Avatar
            class="avatar"
            style="background: #3a7bf5"
            v-else
            :src="item.AVATAR_URL"
          >
          </Avatar>
         <span>{{ item.NAME }}</span>
        </span>
        <span class="email">{{ item.EMAIL }}</span> 
      </li>
    </ul>
    <ul class="search-orgnize" v-if="showDataControl === 'searchOrg'">
      <li v-if="teamList.length < 1">没有数据</li>
      <li v-for="(item, index) in teamList" :key="index">
        <div class="org-list">
          <div class="orgname">{{ item.groupName }}</div>
           <div class="org-num">{{ item.groupCount }}</div> 
        </div>
        <div
          v-if="item.children && item.children.length > 0"
          class="child-wrap"
        >
          <div
            v-for="(inner, i) in item.children"
            :key="i"
            class="org-list-child"
            @click="getItemOrg(inner, i)"
          >
            <div class="orgname">
              <svgIcon
                :iconClass="'icontree'"
                style="vertical-align: bottom"
              />{{ inner.groupName }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import svgIcon from "./SvgIcon";
import axios from "axios";
export default {
  components: { svgIcon },
  data() {
    return {
      iconClass: "iconios-arrow-up",
      selectList: [],
      setValue: "",
      peopleList: [],//人列表
      teamList: [],
      showDataControl: "",//动态类型
      idList: [], //存放部门id
      peopleNum: 0,
    };
  },
  methods: {
    clickIcon() {
      if (this.iconClass === "iconios-arrow-down") {
        this.iconClass = "iconios-arrow-up";
        this.showDataControl = "";
      } else {
        this.iconClass = "iconios-arrow-down";
        this.showDataControl = "searchOrg";
      }

      //this.getOrgTree();
    },
    deleteItem(index) {
      this.selectList.splice(index, 1);
      this.setValue = "";
      this.$emit("on-change", this.selectList, index);
    },
    onChange(event, instance) {
                 // 事件对象  原型
      // console.log(event, instance, "dad");
      this.showDataControl = "searchPeople";//搜索人
      // 调用请求接口
      this.getOrgPeople({ searchParam: this.setValue });
    },
    // enterEvent(item) {
    //   this.selectList.push(item);
    //   this.showDataControl = false;
    //   this.$emit("on-change", this.selectList);
    // }, //人员enter事件
    clickitem(item) {
      if (
        item.USERS_ID !== JSON.parse(localStorage.getItem("userInfoShare")).id
      ) {
        let flag = this.selectList.findIndex((inn) => {
          return JSON.stringify(inn) === JSON.stringify(item);
        });
        if (flag === -1) {
          this.selectList.push(item);
        }
      } else {
        this.$Message.warning("该文档属于本人");
      }
      this.showDataControl = "";
      this.setValue = "";
      this.$emit("on-change", this.selectList);
    }, 
    //单击人员行
    getItemOrg(item, index) {
      this.showDataControl = "searchOrg";
      this.iconClass = "iconios-arrow-up";
      this.getChildNodes(item.children);
      this.getOrgPeople({ DEPT_ID: item.id, DEPT_TREE_LIST: this.idList });
    }, //点击部门获取部门下人员
    getOrgTree() {
      axios
        .post("/p/cs/ark_share/sys_setting/getOrgTree", {})
        .then((res) => {
          if (res.data.code === 0) {
            if (res.data.data.groups.length > 0) {
              this.teamList = [];
              this.teamList = res.data.data.groups;
            }
          }
        });
    }, //获取企业部门
    getChildNodes(treeNode) {
      treeNode.reduce((cur, pre) => {
        if (pre.children && pre.children.length > 0) {
          // console.log(list,"想")
          this.idList.push(pre.id);
          this.getChildNodes(pre.children);
        } else {
          this.idList.push(pre.id);
        }
      }, []);
    },
    getOrgPeople(param) {
      axios
        .post("/p/cs/ark_share/sys_setting/queryUserInfo", param)
        .then((res) => {
         
          if (res.data.code === 0) {
            //  console.log(res.data);
            if (this.showDataControl === "searchOrg") {
              let selectList = this.selectList.concat(res.data.data.userArray);
              // console.log(this.selectList,"U型内增")
              let obj = {};
              //数组去重
              this.selectList = selectList.reduce((pre, cur) => {
                if (
                  cur.USERS_ID !==
                  JSON.parse(localStorage.getItem("userInfoShare")).id
                ) {
                  obj[cur.USERS_ID]
                    ? ""
                    : (obj[cur.USERS_ID] = true && pre.push(cur));
                }
                return pre;
              }, []);
              this.showDataControl = "";
            } else {
              this.peopleList = res.data.data.userArray;
              // console.log(this.peopleList);
            }
          }
        });
    },
  },
  created() {
    this.getOrgTree();
  },
};
</script>
<style lang="less" scoped>
.add-collaborators {
  padding: 10px 0 40px 0;
  display: flex;
  justify-content: center;
  position: relative;
  .show-person {
    width: 356px;
    height: 120px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdee2;
    padding: 8px 12px;
    position: relative;
    overflow-y: auto;
    .labelitem {
      display: inline-block;
      background: #f0f2f5;
      border-radius: 2px;
      padding: 4px 0px 4px 8px;
      margin-right: 8px;
      margin-top: 4px;
    }
    .ark-input {
      border: none;
      padding-left: 0 !important;
    }
    .search-box {
      width: calc(100% - 20px);
    }
    .input-wrap {
      width: calc(100% - 20px);
      display: inline-block;
    }
    .iconorg {
      position: absolute;
      top: 8px;
      right: 10px;
    }
  }
  .float-search-people {
    width: 356px;
    height: 200px;
    background: #ffffff;
    box-shadow: 0px 4px 12px 0px rgba(22, 31, 49, 0.1);
    border-radius: 4px;
    padding: 10px;
    position: absolute;
    top: 120px;
    left: 50%;
    z-index: 1000;
    margin-left: -178px;
    overflow-y: auto;
    .people-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      .user-message {
        font-size: 14px;
        font-weight: 400;
        color: #4e4e4e;
        line-height: 24px;
        .avatar {
          margin-right: 6px;
        }
      }
      .email {
        font-size: 14px;
        font-weight: 400;
        color: #9fa2a8;
        line-height: 17px;
      }
    }
  }
  .search-orgnize {
    width: 356px;
    height: 200px;
    background: #ffffff;
    // border-radius: 4px;
    position: absolute;
    top: 120px;
    left: 50%;
    margin-left: -178px;
    padding: 9px 14px 9px 20px;
    z-index: 1000;
    overflow-y: auto;
    li {
      list-style: none;
      .org-list {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 32px;
        cursor: pointer;
      }
      .org-list-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 32px;
        cursor: pointer;
        &:hover {
          background: #f4f7fd;
        }
      }
      .orgname {
        font-size: 14px;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        float: left;
      }
      .org-num {
        font-size: 12px;
        font-weight: 400;
        color: #9fa2a8;
        line-height: 17px;
        float: right;
      }
      .child-wrap {
      }
    }
  }
}
</style>