import Vue from 'vue';
import ArkUi from '@syman/ark-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import network from './utils/network';

import '@syman/ark-ui/dist/styles/ark-ui.css';
import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';
import './assets/css/index.less';
import singleSpaVue from 'single-spa-vue';
import './assets/css/zTreeStyle.css';

Vue.use(ArkUi);
Vue.prototype.$network = network;

Vue.config.productionTip = false;

// (window as any).vm = new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount('#app');


const appOptions = {
  el: '#microApp',
  router,
  store,
  render: (h:any) => h(App)
}

// 支持应用独立运行、部署，不依赖于基座应用
if (!(window as any).singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

// 基于基座应用，导出生命周期函数
const vueLifecycle = singleSpaVue({
  Vue,
  appOptions
})


export function bootstrap (props: any) {
  // console.log('app1 bootstrap')
  return vueLifecycle.bootstrap(() => {})
}

export function mount (props: any) {
  // console.log('app1 mount')
  return vueLifecycle.mount(() => {})
}

export function unmount (props: any) {
  // console.log('app1 unmount')
  return vueLifecycle.unmount(() => {})
}

