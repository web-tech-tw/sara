import { createRouter, createWebHashHistory } from "vue-router";

const {
  VITE_SARA_TOKEN_NAME: saraTokenName,
} = import.meta.env;

import {
  setReferUrl,
  readUrlRefer,
  safeUrlAssignSpecific,
} from "../utils.js";

const routes = [
  {
    path: "/",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/manage",
    component: () => import("../views/ManageView.vue"),
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
    readUrlRefer((url) => {
      safeUrlAssignSpecific(url);
    });
    if (to.path !== "/manage" && to.path !== "/manage/email") {
      next("/manage");
    }
  } else {
    readUrlRefer((url) => {
      setReferUrl(url);
    });
    if (to.path === "/manage") {
      next("/");
    }
  }
  next();
});

export default router;
