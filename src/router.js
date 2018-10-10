import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users/:idx',
      name: 'users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/result/:idx',
      name: 'result',
      component: () => import('./views/Result.vue')
    }
  ]
});
