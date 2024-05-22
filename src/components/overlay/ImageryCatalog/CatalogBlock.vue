<template>
  <div class="imagery-catalog__block">
    <Collapsible v-model:open="isOpen">
      <CollapsibleTrigger class="w-full">
        <div class="imagery-catalog__block-title">
          <span class="imagery-catalog__block-title-text">{{
            props.item.label
          }}</span>
          <span class="imagery-catalog__block-title-icon">
            <ChevronDownIcon
              :style="{
                transition: 'all 0.2s',
                transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
              }"
            />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent style="margin-top: 8px"> 12345 </CollapsibleContent>
    </Collapsible>
    <div class="imagery-catalog__block-title"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const props = defineProps({
  item: {},
});

const isOpen = ref(false);
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
