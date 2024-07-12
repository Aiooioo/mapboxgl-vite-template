import { shallowRef } from "vue";
import { defineStore } from "pinia";
import { DefaultWebmapTemplate } from "@/common/webmap-template.js";
import WebmapInfo from "@/common/webmap/WebmapInfo.js";
import { useMap } from "@/models/map.js";
import { useZone } from "@/models/zone.js";
import { request } from "@/utils/api/request.ts";
import { nsLogger } from "@/utils/nsLogger.js";

const logger = nsLogger.create("webmap.store");

function loadWebmapDataById(id) {
  return request({
    url: "/map/project/detail",
    method: "POST",
    params: {
      id,
    },
  });
}

const useWebmap = defineStore("webmap", {
  state() {
    return {
      info: shallowRef(null),

      id: "",
      name: "新的工程",
    };
  },

  getters: {
    dirty(state) {
      const mapStore = useMap();
    },
  },

  actions: {
    initDefaultWebmapTemplate() {
      this.id = DefaultWebmapTemplate.id;
      this.name = DefaultWebmapTemplate.name;

      this.info = new WebmapInfo(
        DefaultWebmapTemplate.id,
        DefaultWebmapTemplate.name,
      );

      logger.log("Use default webmap.");
      return Promise.resolve();
    },

    async initWebmapFromRemoteId(id) {
      const zoneStore = useZone();

      try {
        const res = await loadWebmapDataById(id);
        if (res && res.code === 200) {
          const { data } = res;

          this.id = data.id;
          this.name = data.name;

          zoneStore.currentId = data.siteId;

          const webmap = WebmapInfo.createFromRemote(data);
          await webmap.loadingPromise;
        }
      } catch (e) {
        // TODO: toast info, reload failed

        await this.initDefaultWebmapTemplate();
      }
    },
  },
});

export { useWebmap };
