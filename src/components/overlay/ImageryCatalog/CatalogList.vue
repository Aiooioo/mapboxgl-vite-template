<template>
  <div class="imagery-catalog__list">
    <CatalogBlock
      v-for="(item, index) in data"
      :key="`catalog-item-${index}`"
      :item="item"
    ></CatalogBlock>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CatalogBlock from "@/components/overlay/ImageryCatalog/CatalogBlock.vue";

const data = ref(window.mockCatalog);
</script>

<style scoped lang="scss">
.imagery-catalog__list {
  display: flex;
  flex-direction: column;
}
</style>
