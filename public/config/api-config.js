const accessToken =
  "pk.eyJ1IjoiYWlvb2lvbyIsImEiOiJjbHdhNHhxbTIwNjBiMmlxdGVpeDdnZzM4In0.vHK5bpeCj4sSK2POMI4y4Q";

(function () {
  window.networkConfig = {};

  window.gisApiConfig = {
    token: accessToken,

    initialViewProps: {
      // center: [112.59, 28.12], 初始
      center: [114.06009893512996, 22.642168929679734],
      zoom: 17,
      minZoom: 1,
      maxZoom: 18,
    },
  };
})();
