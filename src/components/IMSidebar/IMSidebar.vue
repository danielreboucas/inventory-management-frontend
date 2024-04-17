<template>
  <div class="sidebar-container">
    <Sidebar v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div class="sidebar">
          <span class="close-sidebar-button">
            <Button
              type="button"
              @click="closeCallback"
              icon="pi pi-times"
              rounded
              outlined
            />
          </span>
          <div class="navigation-options">
            <router-link to="/home">Home</router-link>
            <router-link to="/product">Products</router-link>
            <router-link to="/supplier">Suppliers</router-link>
            <router-link to="/order">Orders</router-link>
            <router-link to="/manage">Manage User</router-link>
            <router-link to="/settings">Settings</router-link>
          </div>
          <div class="user-info">
            <div v-if="user.access_token">
              <div class="logout" @click="requestSignoutUser">Log Out</div>
              <div class="user-name">
                <Avatar
                  :label="user.data.firstName?.slice(0, 1)"
                  shape="circle"
                />
                <span>{{ user.data.firstName }} {{ user.data.lastName }}</span>
              </div>
            </div>
            <div v-else>
              <Avatar icon="pi pi-user" shape="circle" />
              <span>
                <span @click="toSignIn">Sign in</span>
                or
                <span @click="toSignUp">Sign up</span>
              </span>
            </div>
          </div>
        </div>
      </template>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = true"></Button>
  </div>
</template>

<script lang="ts">
import { signOutUser } from "@/services/UserService";
import { defineComponent } from "vue";

export default defineComponent({
  name: "IMSidebar",
  props: ["user"],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    toSignIn() {
      this.$router.push("/");
      this.visible = false;
    },
    toSignUp() {
      this.$router.push("/register");
      this.visible = false;
    },
    requestSignoutUser() {
      signOutUser();
      this.$router.push("/");
      this.visible = false;
    },
  },
});
</script>
