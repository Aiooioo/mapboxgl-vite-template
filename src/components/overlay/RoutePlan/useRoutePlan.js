import { ref, reactive, toValue, onMounted } from "vue";
import { useMap } from "@/models/map.js";
import { useMapper } from "@/models/mapper.js";
import { useZone } from "@/models/zone.js";
import { request } from "@/utils/api/request.ts";

function deleteRouteExam(id) {
  return request({
    url: "/exam/route/delete",
    method: "POST",
    params: {
      id,
    },
  });
}

const useRoutePlan = () => {
  const mapStore = useMap();
  const mapperStore = useMapper();
  const zoneStore = useZone();

  function loadRouteListPaged(pageNum) {
    mapperStore.loadPagedLineList(zoneStore.currentId, pageNum);
  }

  function deleteRouteLineById(id) {
    deleteRouteExam(id).then((res) => {
      if (res && res.code === 200 && res.data === true) {
        loadRouteListPaged(1);
      }
    });
  }

  onMounted(() => {
    loadRouteListPaged(1);
  });

  return {
    deleteRouteLineById,
  };
};

export { useRoutePlan };
