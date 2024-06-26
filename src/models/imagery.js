import { nanoid } from "nanoid";
import { defineStore } from "pinia";

export const useImageryStore = defineStore("imagery", {
  state: () => ({
    enableDraw: false,
    markers: [],
    curEditMarker: null,
  }),
  actions: {
    toggelEnableDraw() {
      this.enableDraw = !this.enableDraw;
    },
    setCurEditMarker(marker) {
      console.log("marker clicked--setCurEditMarker", marker);

      if (this.curEditMarker && this.curEditMarker.id !== marker.id) {
        this.curEditMarker.marker.removeClassName("marker-selected");
      }

      this.curEditMarker = marker;
      this.curEditMarker.marker.addClassName("marker-selected");
    },
    addMarker({ marker, el }) {
      const id = nanoid();
      const newMarker = { marker, el, id, type: "tank", style: "carbon--tank" };

      const listener = this.setCurEditMarker.bind(this, newMarker);
      el.addEventListener("click", listener);

      newMarker.listener = listener;
      this.markers.push(newMarker);
    },
    removeMarker() {
      const index = this.markers.findIndex(
        (item) => item.id === this.curEditMarker.id
      );

      if (index > -1) {
        const { marker, el, listener } = this.markers.splice(index, 1)[0];
        marker.remove();

        el.removeEventListener("click", listener);

        this.curEditMarker = null;
      }
    },

    changeMarkerType(val) {
      // console.log("changeMarkerType", val);
      this.curEditMarker.type = val;
    },

    changeMarkerStyle(val) {
      const { marker, style } = this.curEditMarker;

      // console.log("changeMarkerStyle", val);

      marker.removeClassName(style);
      marker.addClassName(val);

      this.curEditMarker.style = val;
    },
  },
});
