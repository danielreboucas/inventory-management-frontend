<template>
  <div class="total-sales-expense-card">
    <div v-if="isSales" class="sales">
      <span class="material-icons-outlined">local_offer</span>
      <div>Total Sales</div>
      <h3>+ R$ {{ sales }}</h3>
    </div>
    <div v-else class="expenses">
      <span class="material-icons-outlined">point_of_sale</span>
      <div>Total Expenses</div>
      <h3>- R$ {{ expenses }}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashboardTotalSalesExpense",
  props: ["expenses", "sales", "isSales"],
});
</script>
