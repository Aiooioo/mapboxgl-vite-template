<template>
  <span class="route-apply__users">
    <i-mdi-user-multiple
      style="color: #a78bfa; margin-right: 4px; font-size: 16px"
    />
    {{ applied }}
  </span>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps(["item"]);

const applied = computed(() => {
  if (props.item) {
    if (props.item.byHand) {
      return (props.item.applyUsers && props.item.applyUsers.length) || 0;
    } else {
      // is schema data struct
      return props.item.applyUsers.length;
    }
  }

  return 0;
});
</script>

<style scoped lang="scss">
.route-apply__users {
  width: 48px;
  flex: none;
  display: flex;
  align-items: center;
  font-size: 14px;
}
</style>
