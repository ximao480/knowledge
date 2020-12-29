import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import DetailsPage from '../components/DetailsPage.vue'


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/DetailsPage',
    name: 'DetailsPage',
    component: DetailsPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/workbench',
  routes,
});

export default router;
