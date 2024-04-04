<template>
  <div class="sidebar">
    <Sidebar v-model:visible="visible">
      <template #container="{ closeCallback }">
        <div>
          <div>
            <span>
              <Button
                type="button"
                @click="closeCallback"
                icon="pi pi-times"
                rounded
                outlined
                class="h-2rem w-2rem"
                >X</Button
              >
            </span>
          </div>
          <div class="navigation-options">
            <div>Home</div>
            <div>Product</div>
            <div>Order</div>
            <div>Manage User</div>
            <div>Settings</div>
            <div>Log Out</div>
          </div>
          <div class="user-info">
            <a v-if="user.access_token">
              <Avatar :label="user?.firstName?.slice(0, 1)" shape="circle" />
              <span>{{ user.firstName }} {{ user.lastName }}</span>
            </a>
            <a v-else>
              <Avatar icon="pi pi-user" shape="circle" />
              <span>
                <span @click="toSignIn">Sign in</span>
                or
                <span @click="toSignUp">Sign up</span>
              </span>
            </a>
          </div>
        </div>
      </template>
    </Sidebar>
    <Button icon="pi pi-arrow-right" @click="visible = true"></Button>
  </div>
</template>

<script lang="ts">
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
  },
});
</script>
