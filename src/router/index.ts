import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import ListProducts from "@/components/Products/ListProducts.vue";

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
  {
    path: "/product",
    name: "product",
    component: ListProducts,
  },
  {
    path: "/order",
    name: "order",
    component: Home,
  },
  {
    path: "/manage",
    name: "manage",
    component: Home,
  },
  {
    path: "/settings",
    name: "settings",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
