<template>
  <Dialog
    modal
    class="create-edit-product-modal"
    :header="isEditing ? 'Edit Product' : 'Create a new Product'"
    :visible="visible"
    :draggable="false"
    @update:visible="closeModal"
    :style="{ width: '25rem' }"
  >
    <div class="inputs-container">
      <div class="input">
        <label for="name">Name</label>
        <InputText v-model="product.name" id="name" />
      </div>
      <div class="input">
        <label for="costPrice">Cost Price</label>
        <InputNumber
          v-model="product.costPrice"
          id="costPrice"
          mode="currency"
          currency="BRL"
          locale="br-BR"
        />
      </div>
      <div class="input">
        <label for="sellingPrice">Selling Price</label>
        <InputNumber
          v-model="product.sellingPrice"
          id="sellingPrice"
          mode="currency"
          currency="BRL"
          locale="br-BR"
        />
      </div>
      <div class="input">
        <label for="quantity">Quantity</label>
        <InputNumber v-model="product.quantity" id="quantity" />
      </div>
    </div>
    <div class="buttons-container">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="closeModal"
      />
      <Button
        v-if="!isEditing"
        type="button"
        label="Create"
        @click="requestCreateProduct"
      />
      <Button v-else type="button" label="Edit" @click="requestEditProduct" />
    </div>
  </Dialog>
</template>

<script lang="ts">
import { createProduct, editProduct } from "@/services/ProductService";
import Product from "@/types/Product";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateEditProductsModal",
  props: ["visible", "productToEdit"],
  emits: ["close-create-modal"],
  data() {
    return {
      product: {} as Product,
    };
  },
  computed: {
    isEditing(): boolean {
      return this.productToEdit.name ? true : false;
    },
  },
  updated() {
    this.product = this.buildProduct(this.productToEdit);
  },
  methods: {
    buildProduct(product: Product) {
      return {
        id: product.id,
        name: product.name,
        costPrice: Number(product.costPrice),
        sellingPrice: Number(product.sellingPrice),
        quantity: product.quantity,
        userId: product.userId,
      };
    },
    closeModal() {
      this.product = {
        id: 0,
        name: "",
        costPrice: 0,
        sellingPrice: 0,
        quantity: 0,
        userId: 1,
      };
      this.$emit("close-create-modal");
    },
    async requestCreateProduct() {
      try {
        await createProduct({
          name: this.product.name,
          costPrice: this.product.costPrice,
          sellingPrice: this.product.sellingPrice,
          quantity: this.product.quantity,
          userId: 1,
        });
        this.$emit("close-create-modal");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: `${this.product.name} created successfully`,
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
    async requestEditProduct() {
      try {
        const newProduct = await editProduct(this.product.id, {
          name: this.product.name,
          costPrice: this.product.costPrice,
          sellingPrice: this.product.sellingPrice,
          quantity: this.product.quantity,
          userId: 1,
        });
        this.$emit("close-create-modal", newProduct);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: `${this.product.name} edited successfully`,
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
});
</script>
