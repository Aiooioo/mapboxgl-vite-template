import { createRouter, createWebHistory } from "vue-router";

function getAbsolutePath() {
  const path = location.pathname;
  return path.substring(0, path.lastIndexOf("/") + 1);
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/imagery",
    },
    {
      path: "/",
      component: () => import("../pages/imagery.vue"),
    },
  ],
});

export default router;
