<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, darkTheme } from "naive-ui";
</script>

<template>
  <n-config-provider :theme="darkTheme" class="w-full h-full">
    <RouterView />
  </n-config-provider>
</template>

<style scoped></style>
