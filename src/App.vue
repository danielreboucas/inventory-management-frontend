<template>
  <div class="app">
    <Toast />
    <ConfirmDialog />
    <Sidebar
      v-if="getStoreUser?.access_token"
      :user="user"
      :setExpandSidebar="setExpandSidebar"
    />
    <div
      :class="`main-container ${isExpanded ? 'is-expanded' : ''} ${
        getStoreUser?.access_token ? 'is-logged-in' : ''
      }`"
    >
      <router-view :user="user" @get-user="requestGetUser" />
    </div>
  </div>
</template>

<script>
import { getUser } from "@/services/UserService";
import { Sidebar } from "@/components/Sidebar/Sidebar.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  components: { Sidebar },
  data() {
    return {
      user: {},
      isExpanded: false,
    };
  },
  computed: {
    ...mapGetters(["getStoreUser"]),
  },
  methods: {
    setExpandSidebar(isExpanded) {
      this.isExpanded = isExpanded;
    },
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
