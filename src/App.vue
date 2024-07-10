<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, darkTheme, zhCN, NMessageProvider } from "naive-ui";
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" class="w-full h-full">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped></style>
