<template>
  <Button
    :class="`im-button im-button-${severity}`"
    :text="text"
    :iconPos="iconPos"
    :disabled="disabled"
    :rounded="rounded"
    :outlined="outlined"
    :size="size"
  >
    <div v-if="iconPos !== 'right'" class="icon-label">
      <i :class="icon" />
      {{ label ? label : "" }}
    </div>
    <div v-else class="icon-label">
      {{ label ? label : "" }}
      <i :class="icon" />
    </div>
  </Button>
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
    "size",
  ],
});
</script>
