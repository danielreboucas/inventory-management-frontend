<template>
  <div class="list-products">
    <h2>Products</h2>
    <CreateEditProductsModal
      :visible="showCreateEditModal"
      :productToEdit="productToEdit"
      @close-create-modal="
        showCreateEditModal = false;
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
          @click="showConfirmDeleteMultiple"
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
            @click="showConfirmDeleteSingle(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { deleteProduct, getAllProducts } from "@/services/ProductService";
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
      showCreateEditModal: false,
    };
  },
  async created() {
    await this.requestGetAllProducts();
  },
  computed: {
    selectedProductsText(): string {
      return this.selectedProducts.length > 1 ? "products" : "product";
    },
  },
  methods: {
    openEditModal(product: Product) {
      this.productToEdit = product;
      this.showCreateEditModal = true;
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
      this.showCreateEditModal = true;
    },
    showConfirmDeleteMultiple() {
      this.$confirm.require({
        message: `Are you sure you want to delete the selected ${this.selectedProductsText}?`,
        header: `Delete ${this.selectedProducts.length} ${this.selectedProductsText}`,
        icon: "icon-delete",
        rejectLabel: "Cancel",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptLabel: "Remove",
        acceptClass: "p-button-danger",
        accept: () => this.requestDeleteProduct(this.selectedProducts),
      });
    },
    showConfirmDeleteSingle(product: Product) {
      this.$confirm.require({
        message: `Are you sure you want to delete ${product.name}?`,
        header: `Delete ${product.name}`,
        icon: "icon-delete",
        rejectLabel: "Cancel",
        rejectClass: "p-button-secondary",
        acceptLabel: "Remove",
        acceptClass: "p-button-danger",
        accept: () => this.requestDeleteProduct([product]),
      });
    },
    async requestDeleteProduct(products: Product[]) {
      let ids: number[] = [];
      products.forEach((product) => {
        if (product.id) ids.push(product.id);
      });
      try {
        const deletedProducts = await deleteProduct(ids);
        this.$toast.add({
          severity: "info",
          summary: "Info",
          detail: `${deletedProducts} ${
            deletedProducts > 1 ? "products" : "product"
          }  deleted`,
          life: 5000,
        });
        await this.requestGetAllProducts();
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
        this.products = products;
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
