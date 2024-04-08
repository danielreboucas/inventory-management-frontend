<template>
  <Dialog
    modal
    header="Create a new Product"
    class="create-product-modal"
    :visible="visible"
    :style="{ width: '25rem' }"
  >
    <div class="inputs-container">
      <div class="input">
        <label for="name">Name</label>
        <InputText v-model="name" id="name" />
      </div>
      <div class="input">
        <label for="costPrice">Cost Price</label>
        <InputText v-model="costPrice" id="costPrice" />
      </div>
      <div class="input">
        <label for="sellingPrice">Selling Price</label>
        <InputText v-model="sellingPrice" id="sellingPrice" />
      </div>
      <div class="input">
        <label for="quantity">Quantity</label>
        <InputText v-model="quantity" id="quantity" />
      </div>
    </div>
    <div class="buttons-container">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="closeModal"
      ></Button>
      <Button
        type="button"
        label="Create"
        @click="requestCreateProduct"
      ></Button>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { createProduct } from "@/services/ProductService";

export default {
  name: "CreateProductsModal",
  props: ["visible"],
  emits: ["close-create-modal", "create-product"],
  data() {
    return {
      name: "",
      costPrice: 0,
      sellingPrice: 0,
      quantity: 0,
    };
  },
  methods: {
    closeModal() {
      this.$emit("close-create-modal");
    },
    async requestCreateProduct() {
      try {
        const newProduct = await createProduct({
          name: this.name,
          costPrice: this.costPrice,
          sellingPrice: this.sellingPrice,
          quantity: this.quantity,
          userId: 1,
        });
        this.$emit("close-create-modal", newProduct);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: "Product created successfully",
          life: 5000,
        });
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
};
</script>
