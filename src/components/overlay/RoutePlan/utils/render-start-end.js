import { toAbsoluteUrl } from "@/utils/url-utils.js";

const DATA_SOURCE_START_POINT = "route-line-start-point";
const DATA_SOURCE_END_POINT = "route-line-end-point";
const LAYER_START_POINT = "layer-route-start-point";
const LAYER_END_POINT = "layer-route-end-point";

let startImageLoaded = false;
let endImageLoaded = false;

function ensureStartImageLoaded(map) {
  if (startImageLoaded) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    map.loadImage(
      toAbsoluteUrl("./imgs/icons/start-point.png"),
      (error, image) => {
        if (error) {
          rej(error);
          return;
        }

        map.addImage("start-point", image);
        startImageLoaded = true;
        res();
      },
    );
  });
}

function ensureEndImageLoaded(map) {
  if (endImageLoaded) {
    return Promise.resolve();
  }

  return new Promise((res, rej) => {
    map.loadImage(
      toAbsoluteUrl("./imgs/icons/end-point.png"),
      (error, image) => {
        if (error) {
          rej(error);
          return;
        }

        map.addImage("end-point", image);
        endImageLoaded = true;
        res();
      },
    );
  });
}

export function renderStartPointSymbol(map, feature) {
  ensureStartImageLoaded(map).then(() => {
    if (!map.getSource(DATA_SOURCE_START_POINT)) {
      map.addSource(DATA_SOURCE_START_POINT, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [feature],
        },
      });
    } else {
      map.getSource(DATA_SOURCE_START_POINT).setData({
        type: "FeatureCollection",
        features: [feature],
      });
    }

    if (!map.getLayer(LAYER_START_POINT)) {
      map.addLayer({
        id: LAYER_START_POINT,
        source: DATA_SOURCE_START_POINT,
        type: "symbol",
        layout: {
          "icon-image": "start-point",
          "icon-size": 0.5,
        },
      });
    }
  });
}

export function clearStartPointSymbol(map) {
  if (!map.getSource(DATA_SOURCE_START_POINT)) {
    return;
  }

  map.getSource(DATA_SOURCE_START_POINT).setData({
    type: "FeatureCollection",
    features: [],
  });
}

export function renderEndPointSymbol(map, feature) {
  ensureEndImageLoaded(map).then(() => {
    if (!map.getSource(DATA_SOURCE_END_POINT)) {
      map.addSource(DATA_SOURCE_END_POINT, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [feature],
        },
      });
    } else {
      map.getSource(DATA_SOURCE_END_POINT).setData({
        type: "FeatureCollection",
        features: [feature],
      });
    }

    if (!map.getLayer(LAYER_END_POINT)) {
      map.addLayer({
        id: LAYER_END_POINT,
        source: DATA_SOURCE_END_POINT,
        type: "symbol",
        layout: {
          "icon-image": "end-point",
          "icon-size": 0.5,
        },
      });
    }
  });
}

export function clearEndPointSymbol(map) {
  if (!map.getSource(DATA_SOURCE_END_POINT)) {
    return;
  }

  map.getSource(DATA_SOURCE_END_POINT).setData({
    type: "FeatureCollection",
    features: [],
  });
}
