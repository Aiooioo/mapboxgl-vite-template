<template>

</template>

<script setup>
import { inject } from 'vue'
import ExtendDrawBar from "./extended/ExtendDrawBar.js";
import useMapboxSketch from "../../utils/hooks/useMapboxSketch.js";

const map = inject('map')

const { draw } = useMapboxSketch(map);

</script>

<style scoped>

</style>
