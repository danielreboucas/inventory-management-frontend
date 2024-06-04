import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { State } from "./store";
import { Store } from "vuex";

import "primevue/resources/themes/aura-light-green/theme.css";
import "material-icons/iconfont/material-icons.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import Checkbox from "primevue/checkbox";
import Sidebar from "primevue/sidebar";
import Avatar from "primevue/avatar";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Toolbar from "primevue/toolbar";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import ConfirmDialog from "primevue/confirmdialog";
import ConfirmationService from "primevue/confirmationservice";
import Tooltip from "primevue/tooltip";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import Dropdown from "primevue/dropdown";
import MultiSelect from "primevue/multiselect";

import IMSidebar from "./components/IMSidebar/IMSidebar.vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}

const app = createApp(App);

app.use(PrimeVue);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("FloatLabel", FloatLabel);
app.component("Checkbox", Checkbox);
app.component("Sidebar", Sidebar);
app.component("Avatar", Avatar);
app.component("Toast", Toast);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("ColumnGroup", ColumnGroup);
app.component("Row", Row);
app.component("Toolbar", Toolbar);
app.component("Dialog", Dialog);
app.component("InputNumber", InputNumber);
app.component("ConfirmDialog", ConfirmDialog);
app.component("IconField", IconField);
app.component("InputIcon", InputIcon);
app.component("Dropdown", Dropdown);
app.component("MultiSelect", MultiSelect);

app.component("IMSidebar", IMSidebar);

app.directive("tooltip", Tooltip);
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);
app.use(router);
app.mount("#app");
