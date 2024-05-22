<script setup>
import EditorStyleLayout from "@/layout/EditorStyleLayout.vue";
import MapboxViewer from "./components/MapboxViewer.vue";
import MapboxBar from "@/components/MapboxBar.vue";
</script>

<template>
  <EditorStyleLayout>
    <template #bar>
      <MapboxBar />
    </template>
    <MapboxViewer />
  </EditorStyleLayout>
</template>

<style scoped></style>
