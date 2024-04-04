<template>
  <div class="login-container">
    <div class="login">
      <h2>Login</h2>
      <div class="login-inputs">
        <InputText v-model="email" placeholder="Email" />
        <Password
          v-model="password"
          placeholder="Password"
          toggleMask
          :feedback="false"
        />
      </div>

      <div class="checkbox-container">
        <div class="checkbox">
          <Checkbox v-model="rememberMe" inputId="rememberme" :binary="true" />
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { signInUser } from "../services/UserService";

export default defineComponent({
  name: "Login",
  props: ["user"],
  data() {
    return {
      rememberMe: false,
      email: "",
      password: "",
    };
  },
  methods: {
    async requestSignInUser() {
      try {
        const user = await signInUser({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/home");
        console.log("user", user);
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    },
    moveToRegisterPage() {
      this.$router.push("/register");
    },
  },
});
</script>
