<template>
  <div class="home">
    {{ user.email }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  props: ["user"],
});
</script>
