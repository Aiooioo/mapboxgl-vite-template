<template>
  <span>{{ props.displayIndex }}</span>
  <span>{{}}</span>
  <span>3km</span>
  <span></span>
  <span @click="removeMe">
    <i-mdi-close v-if="!!props.point" />
  </span>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  displayIndex: {
    type: Number,
  },
  point: {},
});
const emit = defineEmits(["remove"]);

const displayName = computed(() => {
  return props.point && props.point.id;
});

function removeMe() {
  if (!props.point) {
    return;
  }

  emit("remove", props.displayIndex - 1);
}
</script>

<style scoped lang="scss">
span {
  display: flex;
  justify-content: center;
  align-items: center;
}

span:nth-child(1) {
  flex: none;
  width: 32px;
  border-right: 1px solid $secondary_text_color;
}
span:nth-child(2),
span:nth-child(3) {
  flex: none;
  width: 64px;
  border-right: 1px solid $secondary_text_color;
}
span:nth-child(4) {
  flex: 1;
  border-right: 1px solid $secondary_text_color;
}
span:nth-child(5) {
  flex: none;
  width: 32px;
  color: #d81e06;
  cursor: pointer;
}
</style>
