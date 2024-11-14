import {createRouter, createWebHashHistory} from "vue-router";

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
    path: "/debug",
    component: () => import("../views/DebugView.vue"),
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
  scrollBehavior: () => ({top: 0}),
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, _, next) => {
  const refer = readUrlRefer();
  const saraToken = localStorage.getItem(saraTokenName);

  const isRefer = !!refer;
  const isLogged = !!saraToken;

  if (isLogged && isRefer) {
    safeUrlAssignSpecific(refer);
    return;
  }

  if (!isLogged && isRefer) {
    setReferUrl(refer);
  }

  if (isLogged && to.path === "/") {
    next("/manage");
    return;
  }

  if (!isLogged && to.path === "/manage") {
    next("/");
    return;
  }

  next();
});

export default router;
