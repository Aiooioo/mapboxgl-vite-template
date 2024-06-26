import { shallowRef, onMounted, onUnmounted } from "vue";
import { from } from "@vueuse/rxjs";

const useFeatureRender = () => {
  const $channel = shallowRef();

  function initRenderChannel() {}
  function disposeRenderChannel() {}

  onMounted(() => {
    initRenderChannel();
  });
  onUnmounted(() => {
    disposeRenderChannel();
  });

  return {};
};

export { useFeatureRender };
