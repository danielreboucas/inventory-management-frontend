<template>
  <div class="app">
    <Toast />
    <ConfirmDialog />
    <IMSidebar
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
import { IMSidebar } from "@/components/IMSidebar/IMSidebar.vue";
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "App",
  components: { IMSidebar },
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
