<template>
  <div class="imagery-catalog__block">
    <Collapsible v-model:open="isOpen">
      <CollapsibleTrigger class="w-full">
        <div class="imagery-catalog__block-title">
          <span class="imagery-catalog__block-title-text">{{
            props.item.label
          }}</span>
          <span class="imagery-catalog__block-title-icon">
            <i-mdi-keyboard-arrow-down
              :style="{
                transition: 'all 0.2s',
                transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
              }"
            />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent style="margin-top: 8px">
        <CatalogItem
          v-for="(layer, index) in childLayers"
          :key="`catalog-item-${index}`"
          :item="layer"
        />
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CatalogItem from "@/components/overlay/ImageryCatalog/CatalogItem.vue";

const props = defineProps({
  item: {},
});

const isOpen = ref(false);
const childLayers = computed(() => {
  if (!props.item || !props.item.layers) {
    return [];
  }

  return props.item.layers;
});
</script>

<style scoped lang="scss">
.imagery-catalog__block {
  margin-bottom: 8px;

  &-title {
    display: flex;
    align-items: center;
    overflow: hidden;

    &-text {
      flex: 1;
      display: flex;
      align-items: center;
      color: $hint_text_color;
      font-size: 14px;
      font-weight: 500;
    }

    &-icon {
      flex: none;
      margin-left: 10px;
      height: 18px;
      width: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $secondary_text_color;
    }
  }
}
</style>
