import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
