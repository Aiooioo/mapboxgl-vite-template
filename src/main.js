import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "@/router";
import "./assets/style/index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import App from "./App.vue";
import debugSupport from "./utils/debug-support.js";
import pluginsManager from "./utils/plugins-manager.js";
import "@/utils/api/initLogin.ts";
import { nsLogger } from "@/utils/nsLogger.js";

nsLogger.init(["*:CFG", "*:DBG", "*:LOG", "*:INF", "*:WRN", "*:ERR", "*:NOTE"]);

const { appVersion } = navigator;
if (appVersion.indexOf("Win") >= 0) {
  document.body.classList.add("os-windows");
} else if (appVersion.indexOf("Mac") >= 0) {
  document.body.classList.add("os-mac");
} else if (appVersion.indexOf("Linux") >= 0) {
  document.body.classList.add("os-linux");
}

debugSupport.attach();

const app = createApp(App);

pluginsManager.registerAll();

app.use(createPinia());
app.use(router);
app.mount("#app");
