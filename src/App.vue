<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, darkTheme, zhCN, NMessageProvider } from "naive-ui";

const naiveThemeOverride = {
  common: {
    primaryColor: "#a78bfa",
  },
};
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
