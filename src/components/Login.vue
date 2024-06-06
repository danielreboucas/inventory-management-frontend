<template>
  <div class="login-container">
    <div class="left"></div>
    <div class="right">
      <h1>Inventory Management</h1>
      <div class="login">
        <h2>Login</h2>
        <div class="login-inputs">
          <InputText v-model="email" placeholder="Email" />
          <Password
            v-model="password"
            placeholder="Password"
            toggleMask
            :feedback="false"
            @keydown.enter="requestSignInUser"
          />
        </div>

        <div class="checkbox-container">
          <div class="checkbox">
            <Checkbox
              v-model="rememberMe"
              inputId="rememberme"
              :binary="true"
            />
            <label for="rememberme">Remember me</label>
          </div>
          <div class="forgot-password">Forgot password?</div>
        </div>

        <Button class="login-button" @click="requestSignInUser">Login</Button>

        <div class="create-account">
          Don't have an account?
          <div class="signup" @click="moveToRegisterPage">Sign up here</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { signInUser } from "../services/UserService";

export default defineComponent({
  name: "Login",
  props: ["user"],
  emits: ["get-user"],
  data() {
    return {
      rememberMe: false,
      email: "",
      password: "",
    };
  },
  methods: {
    moveToRegisterPage() {
      this.$router.push("/register");
    },
    async requestSignInUser() {
      try {
        const response = await signInUser({
          email: this.email,
          password: this.password,
        });
        this.$emit("get-user");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Successfully logged in",
          life: 5000,
        });
        this.$store.dispatch("setUser", response);
        this.$router.push("/home");
      } catch (error: any) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: error.response.data.message,
          life: 5000,
        });
      }
    },
  },
});
</script>
