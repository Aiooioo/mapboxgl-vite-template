import { watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWebmap } from "@/models/webmap.js";
import { useLayerCollection } from "@/models/layer-collection.js";

const useWebmapCompose = () => {
  const route = useRoute();
  const webmapStore = useWebmap();
  const layerCollection = useLayerCollection();

  watch(
    () => webmapStore.isWebmapLoaded,
    (value) => {
      if (value) {
        layerCollection.loadLayerCollectionsFromWebmap(webmapStore.info);
      }
    },
  );

  onMounted(() => {
    const { params } = route;
    if (params.webmapId) {
      webmapStore.initWebmapFromRemoteId(params.webmapId);
    } else {
      webmapStore.initDefaultWebmapTemplate();
    }
  });

  return {};
};

export { useWebmapCompose };
