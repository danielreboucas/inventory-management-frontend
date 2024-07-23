<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="sales-informations">
      <div class="sales">
        <Card>
          <template #title>
            <span class="material-icons-outlined">local_offer</span>
            Total Sales
          </template>
          <template #content>
            <h3>+ R$ {{ totalSales }}</h3>
          </template>
        </Card>
      </div>
      <div class="expenses">
        <Card>
          <template #title>
            <span class="material-icons-outlined">point_of_sale</span>
            Total Expenses
          </template>
          <template #content>
            <h3>- R$ {{ totalExpenses }}</h3>
          </template>
        </Card>
      </div>
      <div class="profit">
        <Card>
          <template #title>
            <span class="material-icons">account_balance</span>
            Profit
          </template>
          <template #content>
            <h3>{{ totalProfit > 0 ? "" : "-" }}R$ {{ totalProfit }}</h3>
          </template>
        </Card>
      </div>
      <div class="sales-number">
        <Card>
          <template #title>
            <span class="material-icons-outlined">paid</span>
            Number of Sales
          </template>
          <template #content>
            <h3>{{ salesNumber }}</h3>
          </template>
        </Card>
      </div>
      <div class="orders-number">
        <Card>
          <template #title>
            <span class="material-icons-outlined">credit_card</span>
            Number of Orders
          </template>
          <template #content>
            <h3>{{ ordersNumber }}</h3>
          </template>
        </Card>
      </div>
    </div>

    <div class="dashboard-charts">
      <div class="sales-purchases-chart">
        <h3>Sales and Purchases <Dropdown size="small" /></h3>
        <BarChart />
      </div>
      <div class="sales-overview-chart">
        <h3>Profit <Dropdown /></h3>
        <LineChart />
      </div>
    </div>
    <div class="top-selling-products">
      <h3>Top Selling Products</h3>
      <DataTable
        tableStyle="min-width: 50rem"
        :rows="10"
        :value="products.data"
      >
        <Column field="name" header="Name" style="min-width: 12rem"> </Column>
        <Column field="sellingPrice" header="Selling Price">
          <template #body="{ data }"> R$ {{ data.sellingPrice }}</template>
        </Column>
        <Column field="quantity" header="Quantity" />
        <Column header="Total Sales">
          <template> R$ 50.000</template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChart from "../Charts/BarChart.vue";
import LineChart from "../Charts/LineChart.vue";
import Product from "@/types/Product";
import { getAllProducts } from "@/services/ProductService";

export default defineComponent({
  name: "Dashboard",
  components: { BarChart, LineChart },
  emits: ["get-user"],
  props: ["user"],
  data() {
    return {
      totalSales: 200,
      totalExpenses: 100,
      salesNumber: 15,
      ordersNumber: 20,
      products: {
        data: [] as Product[],
        total: 0,
      },
    };
  },
  async created() {
    await this.requestGetAllProducts();
  },
  computed: {
    totalProfit(): number {
      return this.totalSales - this.totalExpenses;
    },
  },
  methods: {
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
