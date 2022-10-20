import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import index from "../views/home/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: index,
    meta: { title: "首页" },
  }
];

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(),
  routes,
});

export default router;
