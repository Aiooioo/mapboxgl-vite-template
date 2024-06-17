<template>
  <div class="page-layout_editor">
    <FullPageLayout>
      <RouterView />
    </FullPageLayout>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import FullPageLayout from "@/layout/components/FullPageLayout.vue";
</script>

<style scoped lang="scss">
.page-layout_editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
}
</style>
