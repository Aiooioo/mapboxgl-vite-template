import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Icons from "unplugin-icons/vite";
import IconResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",

  plugins: [
    vue(),
    Components({
      resolvers: [IconResolver()],
    }),
    Icons({}),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/style/mixin.scss";',
      },
    },
  },
  server: {
    proxy: {
      "/nudt": {
        target: "http://192.168.0.215:6201",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/nudt/, ""),
      },
    },
  },
});
