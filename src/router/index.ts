import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DetailsPage from '../views/DetailsPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:id?',
    name: 'DetailsPage',
    component: DetailsPage,
  }
];

// const router = new VueRouter({
//   mode: 'history',
//   base: '/knowledge',
//   routes,
// });


export default routes;
