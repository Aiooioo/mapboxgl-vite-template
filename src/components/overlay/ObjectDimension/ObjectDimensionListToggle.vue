<template>
  <div class="object-dimension__list-toggle">
    <SwatchIcon />
  </div>
</template>

<script setup>
import { SwatchIcon } from "@heroicons/vue/16/solid";
</script>

<style scoped lang="scss">
.object-dimension__list-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: $primary_text_color;
  cursor: pointer;

  &:hover:not(&.active) {
    color: $secondary_bg_color;
  }

  &.active {
    color: $primary_bg_color;
  }
}
</style>
