<script setup>
import { NConfigProvider, darkTheme } from "naive-ui";
import EditorStyleLayout from "@/layout/EditorStyleLayout.vue";
import MapboxViewer from "./components/MapboxViewer.vue";
import MapboxBar from "@/components/MapboxBar.vue";
</script>

<template>
  <n-config-provider :theme="darkTheme" class="w-full h-full">
    <EditorStyleLayout>
      <template #bar>
        <MapboxBar />
      </template>
      <MapboxViewer />
    </EditorStyleLayout>
  </n-config-provider>
</template>

<style scoped></style>
