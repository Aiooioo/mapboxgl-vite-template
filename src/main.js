import { createApp } from "vue";
import { createPinia } from "pinia";
import "./index.css";
import "./style.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import App from "./App.vue";
import debugSupport from "./utils/debug-support.js";
import pluginsManager from "./utils/plugins-manager.js";

debugSupport.attach();

const pinia = createPinia();

const app = createApp(App);

pluginsManager.registerAll();

app.use(pinia);
app.mount("#app");
