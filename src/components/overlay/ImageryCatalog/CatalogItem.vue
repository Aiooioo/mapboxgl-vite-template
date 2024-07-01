<template>
  <div class="imagery-catalog__item">
    <div class="imagery-catalog__item-check">
      <input type="checkbox" v-model="added" @change="handleItemAddRemove" />
    </div>
    <div class="imagery-catalog__item-label">{{ props.item.label }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useMapboxLayer } from "@/utils/hooks/useMapboxLayer.js";

const props = defineProps({
  item: {},
});
const added = ref(false);

const { toogelLayerVisibility } = useMapboxLayer(props.item);

function handleItemAddRemove() {
  toogelLayerVisibility(added.value);
}
</script>

<style scoped lang="scss">
.imagery-catalog__item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &-check {
    flex: none;
    display: flex;
    align-items: center;
    margin-right: 4px;
  }
  &-label {
    flex: 1;
    font-size: 14px;
    color: $primary_text_color;
  }
}
</style>
