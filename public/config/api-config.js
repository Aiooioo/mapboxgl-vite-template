const accessToken =
  "pk.eyJ1IjoiYWlvb2lvbyIsImEiOiJjbHdhNHhxbTIwNjBiMmlxdGVpeDdnZzM4In0.vHK5bpeCj4sSK2POMI4y4Q";

(function () {
  window.gisApiConfig = {
    token: accessToken,

    initialViewProps: {
      center: [-74.5, 40],
      zoom: 9,
      minZoom: 1,
      maxZoom: 18,
    },
  };
})();
