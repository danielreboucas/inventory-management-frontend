import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Register from "@/components/Register.vue";
import ListProducts from "@/components/Products/ListProducts.vue";
import ListSuppliers from "@/components/Suppliers/ListSuppliers.vue";
import store from "../store/index";

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
    path: "/supplier",
    name: "supplier",
    component: ListSuppliers,
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

router.beforeEach(async (to, from) => {
  const userStore = store;
  if (!userStore.state.user?.access_token && to.name !== "login") {
    return { name: "login" };
  }
});
export default router;
