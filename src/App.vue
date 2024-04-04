<template>
  <div class="app">
    <router-view :user="user" />
    <IMSidebar v-show="user" :user="user" />
  </div>
</template>

<script>
import { getUser } from "@/services/UserService";
import { IMSidebar } from "@/components/IMSidebar/IMSidebar.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: { IMSidebar },
  data() {
    return {
      user: {},
    };
  },
  async mounted() {
    await this.requestGetUser();
  },
  methods: {
    async requestGetUser() {
      try {
        const response = await getUser();
        this.user = response;
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
});
</script>

<style>
@import url("assets/scss/layout.scss");
</style>
