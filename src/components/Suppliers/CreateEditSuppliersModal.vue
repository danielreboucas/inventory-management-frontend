<template>
  <Dialog
    modal
    class="create-edit-supplier-modal"
    :header="isEditing ? 'Edit Supplier' : 'Create a new Supplier'"
    :visible="visible"
    :draggable="false"
    @update:visible="closeModal"
    :style="{ width: '25rem' }"
  >
    <div class="inputs-container">
      <div class="input">
        <label for="name">Name</label>
        <InputText v-model="supplier.name" id="name" />
      </div>
      <div class="input">
        <label for="contactInfo">Contact Info (Phone or email)</label>
        <InputText v-model="supplier.contactInfo" id="contactInfo" />
      </div>
      <div class="input">
        <label for="products">Products</label>
        <MultiSelect
          id="products"
          filter
          optionLabel="name"
          v-model="selectedProducts"
          :options="products"
        />
      </div>
      <div class="input">
        <label for="orders">Orders</label>
        <MultiSelect
          id="orders"
          filter
          optionLabel="name"
          v-model="selectedOrders"
          :options="orders"
        />
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
        @click="requestCreateSupplier"
      />
      <div v-else>
        <Button type="button" label="Edit" @click="requestEditSupplier" />
      </div>
    </div>
  </Dialog>
</template>

<script lang="ts">
import { getAllProducts } from "@/services/ProductService";
import { getAllOrders } from "@/services/OrderService";
import { createSupplier, editSupplier } from "@/services/SupplierService";
import Order from "@/types/Order";
import Product from "@/types/Product";
import Supplier from "@/types/Supplier";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CreateEditSuppliersModal",
  props: ["visible", "supplierToEdit"],
  emits: ["close-create-modal"],
  data() {
    return {
      supplier: {} as Supplier,
      selectedProducts: [] as Product[],
      products: [] as Product[],
      selectedOrders: [] as Order[],
      orders: [] as Order[],
    };
  },
  computed: {
    isEditing(): boolean {
      return this.supplierToEdit?.name ? true : false;
    },
  },
  async updated() {
    await this.requestGetAllProducts();
    await this.requestGetAllOrders();
    this.supplier = this.buildSupplier(this.supplierToEdit);
    this.selectedProducts = this.buildSupplier(this.supplierToEdit).products;
    this.selectedOrders = this.buildSupplier(this.supplierToEdit).orders;
  },
  methods: {
    buildSupplier(supplier: Supplier): Supplier {
      return {
        id: supplier.id,
        name: supplier.name,
        contactInfo: supplier.contactInfo,
        products: supplier.products,
        orders: supplier.orders,
      };
    },
    closeModal() {
      this.supplier = {
        id: 0,
        name: "",
        contactInfo: "",
        products: [],
        orders: [],
      };
      this.$emit("close-create-modal");
    },
    async requestCreateSupplier() {
      try {
        await createSupplier({
          name: this.supplier.name,
          contactInfo: this.supplier.contactInfo,
          products: this.selectedProducts,
          orders: this.selectedOrders,
        });
        this.$emit("close-create-modal");
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: `${this.supplier.name} created successfully`,
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
    async requestEditSupplier() {
      try {
        const newSupplier = await editSupplier(this.supplier.id, {
          name: this.supplier.name,
          contactInfo: this.supplier.contactInfo,
          products: this.selectedProducts,
          orders: this.selectedOrders,
        });
        this.$emit("close-create-modal", newSupplier);
        this.$toast.add({
          severity: "success",
          summary: "Success",
          detail: `${this.supplier.name} edited successfully`,
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
    async requestGetAllProducts(): Promise<void> {
      try {
        const products = await getAllProducts();
        this.products = products.data;
      } catch (error: any) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: error.response.data.message,
          life: 5000,
        });
      }
    },
    async requestGetAllOrders(): Promise<void> {
      try {
        const orders = await getAllOrders();
        this.orders = orders.data;
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
