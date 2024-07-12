<script setup>
import { ref } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import { NConfigProvider, darkTheme, zhCN, NMessageProvider } from "naive-ui";
import { useAuth } from "@/models/auth.js";
import { useUser } from "@/models/user.js";
import { useConfig } from "@/models/config.js";
import { useBasemap } from "@/models/basemap.js";
import { useWebmap } from "@/models/webmap.js";
import { ensureClientAppContent } from "@/lib/clientApp.js";
import { appTimingConst } from "@/common/system-const.js";

const route = useRoute();
const router = useRouter();

const isAppInitialized = ref(false);

const authStore = useAuth();
const userStore = useUser();
const configStore = useConfig();
const basemapStore = useBasemap();
const webmapStore = useWebmap();

const naiveThemeOverride = {
  common: {
    primaryColor: "#a78bfa",
  },
};

function routerSignIn() {}

function sessionAuthRenewInterval() {
  setTimeout(() => {
    authStore.authConfirm().then((isUserValid) => {
      return isUserValid
        ? sessionAuthRenewInterval()
        : userStore.sessionClear().then(() => {
            // TODO: preserve current pathname
          });
    });
  }, appTimingConst.sessionAuthPollMs);
}

function restoreFromSession() {
  return authStore.authConfirm(true).then((isUserValid) => {
    if (isUserValid) {
      sessionAuthRenewInterval();

      return router
        .isReady()
        .then(userStore.userContextInit)
        .then((account) => {
          const { name, params } = route;
          const accountAccessDenied =
            params.accountId && account !== params.accountId;

          if (accountAccessDenied || !name) {
            // TODO: router to user account page
            return routerSignIn();
          }

          if (params.webmapId) {
            return webmapStore.initWebmapFromRemoteId(params.webmapId);
          } else {
            return webmapStore.initDefaultWebmapTemplate();
          }
        });
    } else {
      return Promise.all([userStore.sessionClear(), router.isReady()]).then(
        () => {
          const currentIsNotSignInPage = true;

          if (currentIsNotSignInPage) {
            // TODO: preserve current pathname

            return routerSignIn();
          }
        },
      );
    }
  });
}

// 1. global web socket init

// 2. load application common config
ensureClientAppContent()
  .then(() => {
    configStore.initGlobalConfig();

    basemapStore.initGlobalBasemap();

    return restoreFromSession();
  })
  .then(() => {
    isAppInitialized.value = true;
  });

// 3. load from localStorage

// 4. watch for browser tab navi
window.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // console.log("切走了");
  } else {
    // console.log("我又切回来了");
  }

  return Promise.resolve();
});
</script>

<template>
  <n-config-provider
    :theme="darkTheme"
    :theme-overrides="naiveThemeOverride"
    :locale="zhCN"
    class="w-full h-full"
  >
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
