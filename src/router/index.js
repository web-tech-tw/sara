import { createRouter, createWebHashHistory } from "vue-router";

const {
  VITE_SARA_TOKEN_NAME: saraTokenName,
} = import.meta.env;

import {
  SARA_REFER_KEY_NAME,
} from "../const.js";

import {
  saraReferTrigger
} from "../utils.js";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
      path: '/manage',
      component: () => import('../views/ManageView.vue'),
  },
  {
      path: '/manage/email',
      component: () => import('../views/ManageEmailView.vue'),
  },
  {
      path: '/register',
      component: () => import('../views/RegisterView.vue'),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  if (localStorage.getItem(saraTokenName)) {
      saraReferTrigger((url) => {
          goToSafeLocation(url);
      });
      if (to.path !== '/manage' && to.path !== '/manage/email') {
          next('/manage');
      }
  } else {
      saraReferTrigger((url) => {
          sessionStorage.setItem(SARA_REFER_KEY_NAME, url);
      });
      if (to.path === '/manage') {
          next('/');
      }
  }
  next();
});

export default router;
