const globalDebug = {};

export default {
  attach() {
    window.__DEBUG_GEOH_GLOBAL__ = globalDebug;
  },

  set(key, value) {
    globalDebug[key] = value;
  },
};
