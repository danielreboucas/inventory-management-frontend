<template>
  <aside :class="`${setIsExpanded}`">
    <div :class="`sidebar-title ${setIsExpanded}`">
      <span class="material-icons-outlined">warehouse</span>

      <div class="menu-toggle-wrap">
        <span v-if="!isExpanded" class="material-icons" @click="toggleMenu"
          >keyboard_double_arrow_right</span
        >
        <span v-else class="material-icons" @click="toggleMenu"
          >keyboard_double_arrow_left</span
        >
      </div>
    </div>

    <div class="menu">
      <router-link to="/home" class="button">
        <span class="material-icons">assessment</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link to="/product" class="button">
        <span class="material-icons">storage</span>
        <span class="text">Products</span>
      </router-link>
      <router-link to="/supplier" class="button">
        <span class="material-icons">local_shipping</span>
        <span class="text">Suppliers</span>
      </router-link>
      <router-link to="/order" class="button">
        <span class="material-icons">shopping_bag</span>
        <span class="text"> Orders</span>
      </router-link>
    </div>

    <div class="flex"></div>

    <div class="menu">
      <router-link to="/settings" class="button">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script lang="ts">
import { signOutUser } from "@/services/UserService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IMSidebar",
  props: ["user", "setExpandSidebar"],
  data() {
    return {
      isExpanded: false,
    };
  },
  updated() {
    this.isExpanded = localStorage.getItem("isExpanded") === "true";
    this.setExpandSidebar(this.isExpanded);
  },
  computed: {
    setIsExpanded(): string {
      return this.isExpanded ? "is-expanded" : "";
    },
  },
  methods: {
    toSignIn() {
      this.$router.push("/");
      this.isExpanded = false;
    },
    toSignUp() {
      this.$router.push("/register");
      this.isExpanded = false;
    },
    requestSignoutUser() {
      signOutUser();
      this.$router.push("/");
      this.isExpanded = false;
    },
    toggleMenu() {
      this.isExpanded = !this.isExpanded;
      localStorage.setItem("isExpanded", this.isExpanded.toString());
    },
  },
});
</script>
