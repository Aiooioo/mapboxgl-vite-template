<template>
  <span :class="['route-apply__difficulty', cssDifficultyCls]">
    {{ displayDifficultyText }}
  </span>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps(["item"]);

const cssDifficultyCls = computed(() => {
  return "very-easy";
});
const displayDifficultyText = computed(() => {
  return "非常简单";
});
</script>

<style scoped>
.route-apply__difficulty {
  width: 64px;
  height: 20px;
  border-radius: 3px;
  font-size: 12px;
  color: #121212;
  display: flex;
  justify-content: center;
  align-items: center;

  &.very-easy {
    background: white;
  }
  &.easy {
    background: #ffff00;
  }
  &.medium {
    background: #ed7d31;
  }
  &.hard {
    background: #7f6000;
  }
}
</style>
