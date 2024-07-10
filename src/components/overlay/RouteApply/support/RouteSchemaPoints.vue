<template>
  <div class="route-apply__points">
    <span
      v-for="(it, idx) in points"
      :key="`${props.item.id}-${idx}`"
      class="route-apply__points-thumb"
    >
      {{ it }}
    </span>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import _ from "lodash";

const props = defineProps(["item"]);

const points = computed(() => {
  if (props.item && props.item.byHand) {
    if (props.item.pointList) {
      return _.slice(props.item.pointList, 1, 6);
    }
  }

  return [];
});

const applied = computed(() => {
  return (
    (props.item && props.item.applyUsers && props.item.applyUsers.length) || 0
  );
});
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
