import Vue from 'vue';
import ArkUi from '@syman/ark-ui';
import mavonEditor from '@syman/ark-share-md';
import singleSpaVue from 'single-spa-vue';
import App from './App.vue';
import routes from './router';
import store from './store';
import network from './utils/network';
import '@syman/ark-share-md/dist/css/index.css';

import '@syman/ark-ui/dist/styles/ark-ui.css';
import '@syman/ark-ui/dist/styles/bjIconfonts/iconfont.css';
import './assets/css/index.less';

import "../public-path"
import VueRouter from 'vue-router';
Vue.use(mavonEditor);
Vue.use(ArkUi);
Vue.prototype.$network = network;

Vue.config.productionTip = false;

// @ts-ignore
let router = null;
// @ts-ignore
let instance = null;

console.log(window.location,'window.location')

function render(props = {}) {
  // @ts-ignore
  const { container } = props;
  router = new VueRouter({
    // @ts-ignore
    base: window.__POWERED_BY_QIANKUN__ ? '/knowledge' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
// @ts-ignore
function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      // @ts-ignore
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
// @ts-ignore
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  storeTest(props);
  render(props);
}

export async function unmount() {
  // @ts-ignore
  instance.$destroy();
  // @ts-ignore
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}


