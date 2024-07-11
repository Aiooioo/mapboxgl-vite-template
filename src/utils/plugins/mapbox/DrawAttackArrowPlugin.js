import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from "@turf/turf";

function isClockWise(pnt1, pnt2, pnt3) {
  return (
    (pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) >
    (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0])
  );
}

function mid(pnt1, pnt2) {
  return [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
}

function calcDistance(pnt1, pnt2) {
  return Math.sqrt(
    Math.pow(pnt1[0] - pnt2[0], 2) + Math.pow(pnt1[1] - pnt2[1], 2)
  );
}

function getBaseLength(points) {
  return Math.pow(wholeDistance(points), 0.99);
}

function wholeDistance(points) {
  var distance = 0;
  for (var i = 0; i < points.length - 1; i++)
    distance += calcDistance(points[i], points[i + 1]);
  return distance;
}

function getQBSplinePoints(points) {
  if (points.length <= 2) return points;

  var n = 2;

  var bSplinePoints = [];
  var m = points.length - n - 1;
  bSplinePoints.push(points[0]);
  for (var i = 0; i <= m; i++) {
    for (var t = 0; t <= 1; t += 0.05) {
      var y = 0;
      var x = 0;
      for (var k = 0; k <= n; k++) {
        var factor = getQuadricBSplineFactor(k, t);
        x += factor * points[i + k][0];
        y += factor * points[i + k][1];
      }
      bSplinePoints.push([x, y]);
    }
  }
  bSplinePoints.push(points[points.length - 1]);
  return bSplinePoints;
}

function getQuadricBSplineFactor(k, t) {
  if (k == 0) return Math.pow(t - 1, 2) / 2;
  if (k == 1) return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2;
  if (k == 2) return Math.pow(t, 2) / 2;
  return 0;
}

function getThirdPoint(startPnt, endPnt, angle, distance, clockWise) {
  var azimuth = getAzimuth(startPnt, endPnt);
  var alpha = clockWise ? azimuth + angle : azimuth - angle;
  var dx = distance * Math.cos(alpha);
  var dy = distance * Math.sin(alpha);
  return [endPnt[0] + dx, endPnt[1] + dy];
}

function getAngleOfThreePoints(pntA, pntB, pntC) {
  var angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
  return angle < 0 ? angle + Math.PI * 2 : angle;
}

function getAzimuth(startPnt, endPnt) {
  var azimuth;
  var angle = Math.asin(
    Math.abs(endPnt[1] - startPnt[1]) / calcDistance(startPnt, endPnt)
  );
  if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = angle + Math.PI;
  else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
    azimuth = Math.PI * 2 - angle;
  else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0]) azimuth = angle;
  else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = Math.PI - angle;
  return azimuth;
}

const headHeightFactor = 0.18;
const headWidthFactor = 0.3;
const neckHeightFactor = 0.85;
const neckWidthFactor = 0.15;
const headTailFactor = 0.8;

const createAttackArrowFeature = function (coords) {
  // coords[0].push(coords[0][coords[0].length - 1]);
  // const feature = turf.lineString(coords[0], { name: "attack_arrow" });

  const lineCoords = coords[0];
  lineCoords.push(lineCoords[0]);
  const feature = turf.polygon([lineCoords], {
    name: "attack_arrow",
    sketch: "arrow",
  });

  return feature;
};

const DrawAttackArrow = {
  onSetup: function (opts) {
    const clickCount = 0;

    return {
      coordinates: [],
      clickCount,
    };
  },
  onClick: function (state, e) {
    const { coordinates } = state;

    coordinates[state.clickCount] = [e.lngLat.lng, e.lngLat.lat];
    state.clickCount += 1;

    if (state.clickCount === 3) {
      this.map.fire("draw.create", {
        features: [state.feature.toGeoJSON()],
      });
      this.changeMode("simple_select", {}, { silent: true });
    }
  },
  onMouseMove: function (state, e) {
    // console.log("onmousemove--state", state);
    const { clickCount, coordinates } = state;

    if (clickCount == 2) {
      coordinates[clickCount] = [e.lngLat.lng, e.lngLat.lat];
    }

    this.updateFeature(state);
  },

  toDisplayFeatures: function (state, geojson, display) {
    display(geojson);
  },

  updateFeature: function (state) {
    const { coordinates, feature } = state;
    if (coordinates.length < 3) return;

    const coords = this.generate(coordinates);
    const arrowFeat = createAttackArrowFeature(coords);

    if (feature) {
      feature.setCoordinates(arrowFeat.geometry.coordinates);
    } else {
      const feat = this.newFeature(arrowFeat);
      this.addFeature(feat);

      state.feature = feat;
    }
  },

  generate: function (pnts) {
    // 计算箭尾
    var tailLeft = pnts[0];
    var tailRight = pnts[1];
    if (isClockWise(pnts[0], pnts[1], pnts[2])) {
      tailLeft = pnts[1];
      tailRight = pnts[0];
    }
    var midTail = mid(tailLeft, tailRight);
    var bonePnts = [midTail].concat(pnts.slice(2));
    // 计算箭头
    var headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
    var neckLeft = headPnts[0];
    var neckRight = headPnts[4];
    var tailWidthFactor =
      calcDistance(tailLeft, tailRight) / getBaseLength(bonePnts);
    // 计算箭身
    var bodyPnts = this.getArrowBodyPoints(
      bonePnts,
      neckLeft,
      neckRight,
      tailWidthFactor
    );
    // 整合
    var count = bodyPnts.length;
    var leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    var rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);

    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);

    const coords = [leftPnts.concat(headPnts, rightPnts.reverse())];

    return coords;
  },

  getArrowHeadPoints: function (points, tailLeft, tailRight) {
    var len = getBaseLength(points);
    var headHeight = len * headHeightFactor;
    var headPnt = points[points.length - 1];
    len = calcDistance(headPnt, points[points.length - 2]);
    var tailWidth = calcDistance(tailLeft, tailRight);
    if (headHeight > tailWidth * headTailFactor) {
      headHeight = tailWidth * headTailFactor;
    }
    var headWidth = headHeight * headWidthFactor;
    var neckWidth = headHeight * neckWidthFactor;
    headHeight = headHeight > len ? len : headHeight;
    var neckHeight = headHeight * neckHeightFactor;
    var headEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      headHeight,
      true
    );
    var neckEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      neckHeight,
      true
    );
    var headLeft = getThirdPoint(
      headPnt,
      headEndPnt,
      Math.PI / 2,
      headWidth,
      false
    );
    var headRight = getThirdPoint(
      headPnt,
      headEndPnt,
      Math.PI / 2,
      headWidth,
      true
    );
    var neckLeft = getThirdPoint(
      headPnt,
      neckEndPnt,
      Math.PI / 2,
      neckWidth,
      false
    );
    var neckRight = getThirdPoint(
      headPnt,
      neckEndPnt,
      Math.PI / 2,
      neckWidth,
      true
    );
    return [neckLeft, headLeft, headPnt, headRight, neckRight];
  },

  getArrowBodyPoints: function (points, neckLeft, neckRight, tailWidthFactor) {
    var allLen = wholeDistance(points);
    var len = getBaseLength(points);
    var tailWidth = len * tailWidthFactor;
    var neckWidth = calcDistance(neckLeft, neckRight);
    var widthDif = (tailWidth - neckWidth) / 2;
    var tempLen = 0,
      leftBodyPnts = [],
      rightBodyPnts = [];
    for (var i = 1; i < points.length - 1; i++) {
      var angle =
        getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
      tempLen += calcDistance(points[i - 1], points[i]);
      var w = (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle);
      var left = getThirdPoint(
        points[i - 1],
        points[i],
        Math.PI - angle,
        w,
        true
      );
      var right = getThirdPoint(points[i - 1], points[i], angle, w, false);
      leftBodyPnts.push(left);
      rightBodyPnts.push(right);
    }
    return leftBodyPnts.concat(rightBodyPnts);
  },
};

class DrawAttackArrowPlugin {
  constructor() {
    this.modes = MapboxDraw.modes;
  }

  attach() {
    const modes = MapboxDraw.modes;
    modes.draw_attack_arrow = DrawAttackArrow;
  }
}

export default DrawAttackArrowPlugin;
