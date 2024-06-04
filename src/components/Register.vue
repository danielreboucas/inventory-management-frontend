<template>
  <div class="register-container">
    <div class="register">
      <h2>Register</h2>
      <div class="register-inputs">
        <InputText v-model="firstName" placeholder="First name" />
        <InputText v-model="lastName" placeholder="Last name" />
        <InputText v-model="email" placeholder="Email name" />
        <Password
          v-model="password"
          placeholder="Password"
          toggleMask
          :feedback="false"
        />
        <Password
          v-model="passwordConfirm"
          placeholder="Confirm password"
          toggleMask
          :feedback="false"
        />
      </div>
      <Button class="register-button" @click="requestSignUpUser"
        >Sign up</Button
      >
      <span class="signin" @click="toSignIn">Sign In</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { signUpUser } from "../services/UserService";

export default defineComponent({
  name: "Login",
  props: ["user"],
  data() {
    return {
      rememberMe: false,
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
    };
  },
  methods: {
    toSignIn() {
      this.$router.push("/");
    },
    async requestSignUpUser() {
      try {
        await signUpUser({
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
        });
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Account created succesfully",
          life: 5000,
        });
        this.$router.push("/login");
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
