import { createRouter, createWebHistory } from "vue-router";

function getAbsolutePath() {
  const path = location.pathname;
  return path.substring(0, path.lastIndexOf("/") + 1);
}

const router = createRouter({
  history: createWebHistory(getAbsolutePath()),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/imagery",
    },
    {
      path: "/",
      component: () => import("../layout/EditorStyleLayout.vue"),
      children: [
        {
          path: "imagery",
          name: "imagery",
          component: () => import("../pages/imagery.vue"),
        },
        {
          path: "mapper",
          name: "mapper",
          component: () => import("../pages/mapper.vue"),
        },
      ],
    },
  ],
});

export default router;
