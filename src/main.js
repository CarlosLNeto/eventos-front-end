import { createApp } from "vue";
import AppMenu from "./components/AppMenu.vue";
import router from "./routes";

createApp(AppMenu).use(router).mount("#app");
