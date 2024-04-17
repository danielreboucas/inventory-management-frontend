<template>
  <div class="list-suppliers">
    <h1>Suppliers</h1>

    <CreateEditSuppliersModal
      :visible="showCreateEditModal"
      :supplierToEdit="supplierToEdit"
      @close-create-modal="
        showCreateEditModal = false;
        requestGetAllSuppliers();
      "
    />

    <DataTable
      tableStyle="min-width: 50rem"
      paginator
      v-model:selection="selectedSuppliers"
      v-model:filters="filters"
      :rows="10"
      :value="suppliers.data"
    >
      <template #header>
        <div class="header">
          <div class="search-input">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText
                size="small"
                v-model="filters['global'].value"
                placeholder="Search by Name"
              />
            </IconField>
          </div>
          <div class="header-buttons">
            <Button
              outlined
              size="small"
              icon="pi pi-plus"
              @click="openCreateModal"
            >
              Add Supplier
            </Button>
            <Button
              outlined
              severity="danger"
              size="small"
              icon="pi pi-plus"
              :disabled="!selectedSuppliers || !selectedSuppliers.length"
              @click="showConfirmDeleteMultiple"
            >
              Delete Suppliers
            </Button>
          </div>
        </div>
      </template>

      <Column
        selectionMode="multiple"
        style="width: 3rem"
        :exportable="false"
      />

      <Column field="name" header="Name" style="min-width: 12rem"> </Column>
      <Column field="contactInfo" header="Contact Info">
        <template #body="{ data }">{{ data.contactInfo }}</template>
      </Column>
      <Column field="products" header="Products" style="max-width: 12rem">
        <template #body="{ data }"
          >{{ formatProducts(data.products) }}
        </template>
      </Column>
      <Column field="orders" header="Orders">
        <template #body="{ data }">{{ formatProducts(data.orders) }} </template>
      </Column>

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
import Supplier from "@/types/Supplier";
import CreateEditSuppliersModal from "./CreateEditSuppliersModal.vue";
import { FilterMatchMode } from "primevue/api";
import { deleteSupplier, getAllSuppliers } from "@/services/SupplierService";
import Product from "@/types/Product";

export default defineComponent({
  name: "ListSuppliers",
  components: { CreateEditSuppliersModal },
  props: ["user"],
  data() {
    return {
      suppliers: {
        data: [] as Supplier[],
        total: 0,
      },
      supplierToEdit: {} as Supplier,
      selectedSuppliers: [] as Supplier[],
      showCreateEditModal: false,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  async created() {
    await this.requestGetAllSuppliers();
  },
  computed: {
    selectedSuppliersText(): string {
      return this.selectedSuppliers.length > 1 ? "suppliers" : "supplier";
    },
  },
  methods: {
    formatProducts(products: Product[]) {
      return products
        .map((product) => {
          return product.name;
        })
        .join(", ");
    },
    openEditModal(supplier: Supplier) {
      this.supplierToEdit = supplier;
      this.showCreateEditModal = true;
    },
    openCreateModal() {
      this.supplierToEdit = {
        id: 0,
        name: "",
        contactInfo: "",
        products: [],
        orders: [],
      };
      this.showCreateEditModal = true;
    },
    showConfirmDeleteMultiple() {
      this.$confirm.require({
        message: `Are you sure you want to delete the selected ${this.selectedSuppliersText}?`,
        header: `Delete ${this.selectedSuppliers.length} ${this.selectedSuppliersText}`,
        icon: "icon-delete",
        rejectLabel: "Cancel",
        rejectClass: "p-button-secondary p-button-outlined",
        acceptLabel: "Remove",
        acceptClass: "p-button-danger",
        accept: () => this.requestDeleteSupplier(this.selectedSuppliers),
      });
    },
    showConfirmDeleteSingle(supplier: Supplier) {
      this.$confirm.require({
        message: `Are you sure you want to delete ${supplier.name}?`,
        header: `Delete ${supplier.name}`,
        icon: "icon-delete",
        rejectLabel: "Cancel",
        rejectClass: "p-button-secondary",
        acceptLabel: "Remove",
        acceptClass: "p-button-danger",
        accept: () => this.requestDeleteSupplier([supplier]),
      });
    },
    async requestDeleteSupplier(suppliers: Supplier[]) {
      let ids: number[] = [];
      suppliers.forEach((supplier) => {
        if (supplier.id) ids.push(supplier.id);
      });
      try {
        const deletedSuppliers = await deleteSupplier(ids);
        this.$toast.add({
          severity: "info",
          summary: "Info",
          detail: `${deletedSuppliers} ${
            deletedSuppliers > 1 ? "suppliers" : "supplier"
          }  deleted`,
          life: 5000,
        });
        await this.requestGetAllSuppliers();
      } catch (error: any) {
        this.$toast.add({
          severity: "error",
          summary: "Error",
          detail: error.response.data.message,
          life: 5000,
        });
      }
    },
    async requestGetAllSuppliers(): Promise<void> {
      try {
        const suppliers = await getAllSuppliers();
        this.suppliers = suppliers;
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
