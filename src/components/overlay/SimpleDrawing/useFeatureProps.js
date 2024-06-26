import { reactive, computed, onMounted, onUnmounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { BehaviorSubject } from "rxjs";
import { from } from "@vueuse/rxjs";
import { useFeature } from "@/models/feature.js";

const useFeatureProps = (ctx) => {
  const $channel = new BehaviorSubject(null);
  const propertyState = reactive({
    remark: "",
  });
  const sketchType = computed(() => {
    return ctx.geometryType;
  });

  const featureStore = useFeature();
  const { featureProps } = storeToRefs(featureStore);

  watch(ctx, (value) => {});

  onMounted(() => {
    from(featureProps).subscribe((v) => {
      $channel.next(v);
    });
  });
  onUnmounted(() => {});

  return {
    $channel,
    sketchType,
    propertyState,
  };
};

export { useFeatureProps };
