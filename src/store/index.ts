import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    moduleLists: [/* 欢迎页模块 */
      {
        name: 'welcome',
        title: '欢迎使用ARK Share',
        component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue'),
      },
      {
        name: 'tasks',
        title: '待办任务',
        component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      },
      {
        name: 'dynamic',
        title: '我的动态',
        component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      },
      {
        name: 'knowledge',
        title: '我的协作知识库',
        component: () => import(/* webpackChunkName: "about" */ '../components/tasks.vue'),
      },
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
