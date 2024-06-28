import { ref, reactive, toValue, onMounted } from "vue";
import { useMap } from "@/models/map.js";
import { useMapper } from "@/models/mapper.js";

const useRoutePlan = () => {
  const mapStore = useMap();
  const mapperStore = useMapper();

  function loadRouteListPaged(pageNum) {
    mapperStore.loadPagedLineList(pageNum);
  }

  onMounted(() => {
    loadRouteListPaged(1);
  });
};

export { useRoutePlan };
