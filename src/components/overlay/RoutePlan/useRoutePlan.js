import { ref, reactive, toValue, onMounted } from "vue";
import { useMap } from "@/models/map.js";
import { useMapper } from "@/models/mapper.js";
import { useZone } from "@/models/zone.js";

const useRoutePlan = () => {
  const mapStore = useMap();
  const mapperStore = useMapper();
  const zoneStore = useZone();

  function loadRouteListPaged(pageNum) {
    mapperStore.loadPagedLineList(zoneStore.currentId, pageNum);
  }

  onMounted(() => {
    loadRouteListPaged(1);
  });

  return {};
};

export { useRoutePlan };
