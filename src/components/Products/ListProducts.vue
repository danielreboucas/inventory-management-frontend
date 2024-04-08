<template>
  <div class="list-products">
    <h2>Products</h2>
    <CreateEditProductsModal
      :visible="showCreateModal"
      :productToEdit="productToEdit"
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
        <Button outlined icon="pi pi-plus" @click="openCreateModal">
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

      <Column field="name" header="Name">
        <template #body="{ data }"> {{ data.name }} </template>
      </Column>
      <Column field="costPrice" header="Cost Price (R$)" />
      <Column field="sellingPrice" header="Selling Price (R$)" />
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
            @click="openEditModal(slotProps.data)"
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
import CreateEditProductsModal from "./CreateEditProductsModal.vue";

export default defineComponent({
  name: "ListProducts",
  components: { CreateEditProductsModal },
  props: ["user"],
  data() {
    return {
      products: {
        data: [] as Product[],
        total: 0,
      },
      productToEdit: {} as Product,
      selectedProducts: [] as Product[],
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
      this.productToEdit = product;
      this.showCreateModal = true;
    },
    openCreateModal() {
      this.productToEdit = {
        id: 0,
        name: "",
        costPrice: 0,
        sellingPrice: 0,
        quantity: 0,
        userId: 1,
      };
      this.showCreateModal = true;
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
