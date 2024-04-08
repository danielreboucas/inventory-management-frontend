<template>
  <div class="list-products">
    <h2>Products</h2>
    <CreateProductsModal
      id="createModal"
      :visible="showCreateModal"
      @close-create-modal="
        showCreateModal = false;
        requestGetAllProducts();
      "
    />
    <DataTable
      :value="products.data"
      v-model:selection="selectedProducts"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <Button outlined icon="pi pi-plus" @click="showCreateModal = true">
          Add New Product
        </Button>
        <Button
          outlined
          severity="danger"
          icon="pi pi-plus"
          :disabled="!selectedProducts || !selectedProducts.length"
          @click="showDeleteModal = true"
        >
          Delete Products
        </Button>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      />

      <Column field="name" header="Name" />
      <Column field="costPrice" header="Cost Price" />
      <Column field="sellingPrice" header="Selling Price" />
      <Column field="quantity" header="Quantity" />

      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            outlined
            rounded
            class="mr-2"
            @click="openEditModal(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            outlined
            rounded
            severity="danger"
            @click="openDeleteModal(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAllProducts } from "@/services/ProductService";
import Product from "@/types/Product";
import CreateProductsModal from "./CreateProductsModal.vue";

export default defineComponent({
  name: "ListProducts",
  components: { CreateProductsModal },
  props: ["user"],
  data() {
    return {
      products: {
        data: [] as Product[],
        total: 0,
      },
      selectedProducts: [] as Product[],
      createModal: {},
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
    };
  },
  async created() {
    await this.requestGetAllProducts();
  },
  methods: {
    openEditModal(product: Product) {
      this.showDeleteModal = true;
    },
    async requestGetAllProducts(): Promise<void> {
      try {
        const products = await getAllProducts();
        this.products = products;
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    },
  },
});
</script>
