import { createRouter, createWebHistory } from "vue-router";
import HomeUser from "./components/HomeUser.vue";
import AppMenu from "./components/AppMenu.vue";

const routes = [
  { path: "/", component: AppMenu },
  { path: "/user", component: HomeUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
