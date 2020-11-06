import Vue from 'vue';
import ArkUi from '@syman/ark-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import network from './utils/network';

import '@syman/ark-ui/dist/styles/ark-ui.css';
import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';
import './assets/css/index.less';

Vue.use(ArkUi);
Vue.prototype.$network = network;

Vue.config.productionTip = false;

(window as any).vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
