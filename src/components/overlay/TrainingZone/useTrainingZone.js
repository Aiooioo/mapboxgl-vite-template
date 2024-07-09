import { ref, watch, onMounted } from "vue";
import { useZone } from "@/models/zone.js";

const useTrainingZone = () => {
  const state = ref("loading");
  const zoneStore = useZone();

  onMounted(() => {
    zoneStore.$reset();

    zoneStore.loadZoneList();
  });

  return {
    state,
  };
};

export { useTrainingZone };
