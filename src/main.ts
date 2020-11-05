import Vue from 'vue';
import ArkUi from '@syman/ark-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import '@syman/ark-ui/dist/styles/ark-ui.css';
import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';
import './assets/css/reset.css';

Vue.use(ArkUi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
