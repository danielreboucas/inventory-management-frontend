<template>
  <div class="home">
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  props: ["user"],
  data() {
    return {
      products: [
        {
          code: "f230fh0g3",
          name: "Bamboo Watch",
          category: "Accessories",
          quantity: 24,
        },
        {
          code: "nvklal433",
          name: "Black Watch",
          category: "Accessories",
          quantity: 61,
        },
      ],
    };
  },
});
</script>
