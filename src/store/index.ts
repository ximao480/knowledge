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
        name: 'welcome',
        title: '欢迎使用ARK Share',
        component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue'),
      },
      {
        name: 'welcome',
        title: '欢迎使用ARK Share',
        component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue'),
      },
      {
        name: 'welcome',
        title: '欢迎使用ARK Share',
        component: () => import(/* webpackChunkName: "about" */ '../components/welcome.vue'),
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
