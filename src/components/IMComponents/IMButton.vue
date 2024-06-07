<template>
  <div class="im-button">
    <Button
      :class="`im-button-${severity}`"
      :text="text"
      :iconPos="iconPos"
      :disabled="disabled"
      :rounded="rounded"
      :outlined="outlined"
    >
      <div v-if="iconPos !== 'right'">
        <i :class="icon" />
        {{ label }}
      </div>
      <div v-else>
        {{ label }}
        <i :class="icon" />
      </div>
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IMButton",
  props: [
    "label",
    "severity",
    "icon",
    "iconPos",
    "text",
    "disabled",
    "rounded",
    "outlined",
  ],
});
</script>
