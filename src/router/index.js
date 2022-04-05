import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/manage',
    name: 'manage',
    component: () => import('../views/ManageView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    props: true
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('unified_token')) {
    if (to.name !== 'manage') {
      next({name: 'manage'});
    }
  } else {
    if (to.name === 'manage') {
      next({name: 'home'});
    }
  }
  next();
});

export default router;
