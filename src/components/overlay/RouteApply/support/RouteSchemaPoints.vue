<template>
  <div class="route-apply__points-hint">途经检查点</div>
  <div class="route-apply__points">
    <span
      v-for="(it, idx) in points"
      :key="`${props.item.id}-${idx}`"
      class="route-apply__points-thumb"
      :title="`检查点${idx + 1}:\n${it}号点`"
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
      return props.item.pointList[1].split(",");
    }
  } else {
    // is schema data struct
    return props.item.pointList;
  }

  return [];
});
</script>

<style scoped lang="scss">
.route-apply__points-hint {
  margin-bottom: 4px;
  font-size: 13px;
  color: $secondary-text-color;
}
.route-apply__points {
  display: flex;
  align-items: center;
  gap: 20px;

  &-thumb {
    position: relative;
    flex: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: $hint_text_color;
    font-size: 12px;
    line-height: 20px;
    color: $primary_bg_color;
    text-align: center;

    &:hover {
      background: $secondary_bg_color;
      color: $primary_text_color;
    }

    &:not(:last-child)::after {
      position: absolute;
      left: 20px;
      bottom: 10px;
      content: " ";
      display: flex;
      height: 2px;
      width: 12px;
      margin-left: 4px;
      background: $primary_bg_color;
      opacity: 0.5;
    }
  }
}
</style>
