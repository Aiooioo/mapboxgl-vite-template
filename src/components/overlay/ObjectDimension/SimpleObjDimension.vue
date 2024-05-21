<template>
  <div class="object-dimension__simple">
    <div class="object-dimension__simple-title">对象分类标注</div>
    <div class="object-dimension__simple-content">
      <div class="object-dimension__simple-type">
        <div class="object-dimension__simple-type-label">对象分类</div>
        <div class="object-dimension__simple-type-input">
          <ObjectTypeSelect />
        </div>
      </div>
      <div class="object-dimension__simple-draw">
        <div class="object-dimension__simple-draw-label">对象标注</div>
        <div class="object-dimension__simple-draw-input">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import ObjectTypeSelect from "./ObjectTypeSelect.vue";

const map = inject("map");
</script>

<style scoped lang="scss">
.object-dimension__simple {
  padding: 15px;
  background: #fff;
  border-radius: 4px;
  pointer-events: auto;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);

  &-title {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
  }

  &-content {
    padding: 4px;
  }

  &-type,
  &-draw {
    display: flex;
    flex-direction: column;

    &-label {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 6px;
    }
  }

  &-draw {
    margin-top: 15px;

  }
}
</style>
