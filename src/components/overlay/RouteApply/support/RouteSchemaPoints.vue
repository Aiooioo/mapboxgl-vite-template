<template>
  <div class="route-apply__points">
    <span
      v-for="(it, idx) in [1, 2, 3, 4, 5]"
      :key="``"
      class="route-apply__points-thumb"
    >
      {{ it }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["item"]);
</script>

<style scoped lang="scss">
.route-apply__points {
  display: flex;
  align-items: center;
  gap: 20px;

  &-thumb {
    position: relative;
    flex: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: $hint_text_color;
    font-size: 12px;
    line-height: 16px;
    color: $secondary_bg_color;
    text-align: center;

    &:not(:last-child)::after {
      position: absolute;
      left: 16px;
      bottom: 7px;
      content: " ";
      display: flex;
      height: 2px;
      width: 12px;
      margin-left: 4px;
      background: $secondary_bg_color;
      opacity: 0.5;
    }
  }
}
</style>
