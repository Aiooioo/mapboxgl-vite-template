<template>
  <div class="route-planning-view__editor-row">
    <span class="route-planning-view__editor-row-wrapper">
      <RouteCheckPointsList
        :route-name="props.taskName"
        :points="props.checkPoints"
        @remove-point="handleRemovePoint"
      />
    </span>
  </div>
  <div class="route-planning-view__editor-row">
    <span class="route-planning-view__editor-row-label">路线难度</span>
    <span class="route-planning-view__editor-row-wrapper">
      <span class="route-planning-view__editor-rates">
        <span
          :class="[
            'route-planning-view__editor-rate very-easy',
            { selected: props.difficulty === 'very-easy' },
          ]"
          @click="() => emit('changeDifficulty', 'very-easy')"
        >
          <span class="route-planning-view__editor-rate-inner">非常简单</span>
        </span>
        <span
          :class="[
            'route-planning-view__editor-rate easy',
            { selected: props.difficulty === 'easy' },
          ]"
          @click="() => emit('changeDifficulty', 'easy')"
        >
          <span class="route-planning-view__editor-rate-inner">简单</span>
        </span>
        <span
          :class="[
            'route-planning-view__editor-rate medium',
            { selected: props.difficulty === 'medium' },
          ]"
          @click="() => emit('changeDifficulty', 'medium')"
        >
          <span class="route-planning-view__editor-rate-inner">中等</span>
        </span>
        <span
          :class="[
            'route-planning-view__editor-rate hard',
            { selected: props.difficulty === 'hard' },
          ]"
          @click="() => emit('changeDifficulty', 'hard')"
        >
          <span class="route-planning-view__editor-rate-inner">困难</span>
        </span>
      </span>
    </span>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import RouteCheckPointsList from "../RouteCheckPointsList.vue";

const emit = defineEmits(["removePoint", "changeDifficulty"]);
const props = defineProps({
  difficulty: {},
  checkPoints: {},
  taskName: {},
  startPoint: {},
  endPoint: {},
});

function handleRemovePoint(index) {
  emit("removePoint", index);
}
</script>
