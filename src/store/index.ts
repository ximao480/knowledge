import Vue from 'vue';
import Vuex from 'vuex';

import axios from './../utils/network'
// 获取日程详细信息

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // getqueryScheduleDate(data).then(res=>{
    //   this.userinfo=data
    //   this.queryScheduleDate=res.data.data
    //   console.log(this.queryScheduleDate);
    data:{},
    queryScheduleDate:{},
    moduleLists: [/* 欢迎页模块 */
      // {
      //   name: 'welcome',
      //   title: '欢迎使用ARK Share',
      //   component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue'),
      // },
      {
        name: 'tasks',
        title: '待办任务',
        component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      },
      // {
      //   name: 'dynamic',
      //   title: '我的动态',
      //   component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      // },
      {
        name: 'DATA',
        title: '我的日程',
        component: () => import(/* webpackChunkName: "about" */ '../components/DATA.vue'),
      },
      // {
      //   name: 'knowledge',
      //   title: '我的协作知识库',
      //   component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      // },
      {
        name: "ORK",
        title: '我的ORK',
        component: () => import(/* webpackChunkName: "about" */ '../components/OKR.vue'),
      },
    ]
  },
  mutations: {
    QUERYSCHEDULEDATE(state, enabled) {
      state.queryScheduleDate = enabled
    },
  },
  actions: {
    deleteScheduleDate({ commit }, params) { // 删除日程详细信息
      return axios.get(`/p/cs/deleteSchedule?id=${params.id}`, params)
    },
    updateScheduleDate({ commit }, params) { // 修改日程详细信息
      return axios.post('/p/cs/updateSchedule', params)
    },
    
    GRTQUERYScheduledate({commit},params){
      axios.get(`/p/cs/querySchedule?id=${params.id}`).then(res=>{
        console.log(res);
      commit("QUERYSCHEDULEDATE", res.data.data)
      })
     
    }
  },
  getters: {
    queryScheduleDate: state => state.queryScheduleDate,
  },
  modules: {
  },
});