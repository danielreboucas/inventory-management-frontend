<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="total-sales-expenses">
      <DashboardTotalSalesExpense :isSales="true" :sales="totalSales" />
      <DashboardTotalSalesExpense :expenses="totalExpenses" />
    </div>
    <BarChart />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarChart from "../Charts/BarChart.vue";
import DashboardTotalSalesExpense from "./DashboardTotalSalesExpense.vue";

export default defineComponent({
  name: "Dashboard",
  components: { BarChart, DashboardTotalSalesExpense },
  emits: ["get-user"],
  props: ["user"],
  data() {
    return {
      totalSales: 200,
      totalExpenses: 100,
    };
  },
});
</script>
