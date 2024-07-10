<template>
  <span class="route-apply__users">
    <i-mdi-user-multiple
      style="color: #a78bfa; margin-right: 4px; font-size: 16px"
    />
    {{ props.item.applyStudent }}
  </span>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["item"]);
</script>

<style scoped lang="scss">
.route-apply__users {
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
