import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "primevue/resources/themes/aura-light-green/theme.css";
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

import IMSidebar from "./components/IMSidebar/IMSidebar.vue";

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

app.component("IMSidebar", IMSidebar);

app.use(ToastService);
app.use(store);
app.use(router);
app.mount("#app");
