import { defineStore } from "pinia";
import { toValue } from "vue";
import { useMap } from "./map.js";
import { request } from "@/utils/api/request.ts";

export const DATA_SOURCE_ROUTE_LINE = "route-lines";
export const SYMBOL_LAYER_ROUTE_LINE = "route-line-layer";
export const SYMBOL_LAYER_ROUTE_CHECK_POINT = "route-check-points-layer";

async function ensureRouteLineSourceAndLayer(map) {
  if (!map.getSource(DATA_SOURCE_ROUTE_LINE)) {
    map.addSource(DATA_SOURCE_ROUTE_LINE, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    });
  }

  if (!map.getLayer(SYMBOL_LAYER_ROUTE_LINE)) {
    map.addLayer({
      id: SYMBOL_LAYER_ROUTE_LINE,
      source: DATA_SOURCE_ROUTE_LINE,
      type: "line",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "#e5a746",
        "line-width": 2,
      },
    });
  }

  if (!map.getLayer(SYMBOL_LAYER_ROUTE_CHECK_POINT)) {
  }
}

const useMapper = defineStore("mapper", {
  state: () => {
    return {
      loadingLines: false,

      currentView: "list",

      selectedLine: "1",

      lines: [],
      lineListPage: 1,
      lineListTotal: 0,

      lineInEdit: null,
    };
  },

  actions: {
    async loadPagedLineList(zoneId, pageNum, pageSize = 10) {
      try {
        const res = await request({
          method: "GET",
          url: "/exam/route/list",
          params: {
            siteId: zoneId,
            pageSize,
            pageNum,
          },
        });

        if (res.code === 200) {
          this.lines = res.data.list;

          this.lineListTotal = res.data.total;
          this.lineListPage = res.data.pageNum;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async switchDisplayRouteLine(lineId) {
      const line = this.lines.find((l) => l.id === lineId);

      if (!line) return;

      const mapStore = useMap();
      const map = toValue(mapStore.map);

      if (map) {
        await ensureRouteLineSourceAndLayer(map);

        const ft = JSON.parse(line.roads);

        const source = map.getSource(DATA_SOURCE_ROUTE_LINE).setData(ft);
      }
    },

    goToAddNewLine() {
      this.lineInEdit = null;
      this.currentView = "editor";
    },
    cancelEditLine() {
      this.lineInEdit = null;

      this.currentView = "list";
    },
    saveCurrentLine() {
      this.lineInEdit = null;

      this.currentView = "list";
    },
  },
});

export { useMapper };
