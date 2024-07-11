import {
  calcMid,
  getThirdPoint,
  calcDistance,
  getAngleOfThreePoints,
  getBaseLength,
  wholeDistance,
  isClockWise,
  HALF_PI,
  getBezierPoints,
} from "./PlotUtil";

export default class DoubleArrow {
  static headHeightFactor = 0.25;
  static headWidthFactor = 0.3;
  static neckHeightFactor = 0.85;
  static neckWidthFactor = 0.15;
  static connPoint = null;
  static tempPoint4 = null;
  static fixPointCount = 4;

  constructor() {}

  static getArrowPoints(pnt1, pnt2, pnt3, clockWise) {
    var midPnt = calcMid(pnt1, pnt2);
    var len = calcDistance(midPnt, pnt3);
    var midPnt1 = getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
    var midPnt2 = getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
    //var midPnt3=PlotUtils.getThirdPoint(pnt3, midPnt, 0, len * 0.7, true);
    midPnt1 = getThirdPoint(midPnt, midPnt1, HALF_PI, len / 5, clockWise);
    midPnt2 = getThirdPoint(midPnt, midPnt2, HALF_PI, len / 4, clockWise);
    //midPnt3=PlotUtils.getThirdPoint(midPnt, midPnt3, Constants.HALF_PI, len / 5, clockWise);

    var points = [midPnt, midPnt1, midPnt2, pnt3];
    // 计算箭头部分
    var arrowPnts = this.getArrowHeadPoints(
      points,
      this.headHeightFactor,
      this.headWidthFactor,
      this.neckHeightFactor,
      this.neckWidthFactor
    );
    var neckLeftPoint = arrowPnts[0];
    var neckRightPoint = arrowPnts[4];
    // 计算箭身部分
    var tailWidthFactor = calcDistance(pnt1, pnt2) / getBaseLength(points) / 2;
    var bodyPnts = this.getArrowBodyPoints(
      points,
      neckLeftPoint,
      neckRightPoint,
      tailWidthFactor
    );
    var n = bodyPnts.length;
    var lPoints = bodyPnts.slice(0, n / 2);
    var rPoints = bodyPnts.slice(n / 2, n);
    lPoints.push(neckLeftPoint);
    rPoints.push(neckRightPoint);
    lPoints = lPoints.reverse();
    lPoints.push(pnt2);
    rPoints = rPoints.reverse();
    rPoints.push(pnt1);
    return lPoints.reverse().concat(arrowPnts, rPoints);
  }

  static getArrowHeadPoints(points, tailLeft, tailRight) {
    var len = getBaseLength(points);
    var headHeight = len * this.headHeightFactor;
    var headPnt = points[points.length - 1];
    // var tailWidth = calcDistance(tailLeft, tailRight);
    var headWidth = headHeight * this.headWidthFactor;
    var neckWidth = headHeight * this.neckWidthFactor;
    var neckHeight = headHeight * this.neckHeightFactor;
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
      HALF_PI,
      headWidth,
      false
    );
    var headRight = getThirdPoint(
      headPnt,
      headEndPnt,
      HALF_PI,
      headWidth,
      true
    );
    var neckLeft = getThirdPoint(
      headPnt,
      neckEndPnt,
      HALF_PI,
      neckWidth,
      false
    );
    var neckRight = getThirdPoint(
      headPnt,
      neckEndPnt,
      HALF_PI,
      neckWidth,
      true
    );
    return [neckLeft, headLeft, headPnt, headRight, neckRight];
  }

  static getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
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
  }

  // 计算对称点
  static getTempPoint4(linePnt1, linePnt2, point) {
    const midPnt = calcMid(linePnt1, linePnt2);
    const len = calcDistance(midPnt, point);
    const angle = getAngleOfThreePoints(linePnt1, midPnt, point);
    let symPnt, distance1, distance2, mid;
    if (angle < HALF_PI) {
      distance1 = len * Math.sin(angle);
      distance2 = len * Math.cos(angle);
      mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
      symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, true);
    } else if (angle >= HALF_PI && angle < Math.PI) {
      distance1 = len * Math.sin(Math.PI - angle);
      distance2 = len * Math.cos(Math.PI - angle);
      mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, false);
      symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, false);
    } else if (angle >= Math.PI && angle < Math.PI * 1.5) {
      distance1 = len * Math.sin(angle - Math.PI);
      distance2 = len * Math.cos(angle - Math.PI);
      mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
      symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, true);
    } else {
      distance1 = len * Math.sin(Math.PI * 2 - angle);
      distance2 = len * Math.cos(Math.PI * 2 - angle);
      mid = getThirdPoint(linePnt1, midPnt, HALF_PI, distance1, true);
      symPnt = getThirdPoint(midPnt, mid, HALF_PI, distance2, false);
    }
    return symPnt;
  }

  static generate(pnts) {
    const pnt1 = pnts[0];
    const pnt2 = pnts[1];
    const pnt3 = pnts[2];
    const count = pnts.length;

    if (count == 3) {
      this.tempPoint4 = this.getTempPoint4(pnt1, pnt2, pnt3);
    } else {
      this.tempPoint4 = pnts[3];
    }

    if (count == 3 || count == 4) {
      this.connPoint = calcMid(pnt1, pnt2);
    } else {
      this.connPoint = this.points[4];
    }

    let leftArrowPnts, rightArrowPnts;

    if (isClockWise(pnt1, pnt2, pnt3)) {
      leftArrowPnts = this.getArrowPoints(
        pnt1,
        this.connPoint,
        this.tempPoint4,
        false
      );
      rightArrowPnts = this.getArrowPoints(this.connPoint, pnt2, pnt3, true);
    } else {
      leftArrowPnts = this.getArrowPoints(pnt2, this.connPoint, pnt3, false);
      rightArrowPnts = this.getArrowPoints(
        this.connPoint,
        pnt1,
        this.tempPoint4,
        true
      );
    }
    const m = leftArrowPnts.length;
    const t = (m - 5) / 2;

    const llBodyPnts = leftArrowPnts.slice(0, t);
    const lArrowPnts = leftArrowPnts.slice(t, t + 5);
    let lrBodyPnts = leftArrowPnts.slice(t + 5, m);

    let rlBodyPnts = rightArrowPnts.slice(0, t);
    const rArrowPnts = rightArrowPnts.slice(t, t + 5);
    const rrBodyPnts = rightArrowPnts.slice(t + 5, m);

    rlBodyPnts = getBezierPoints(rlBodyPnts);
    const bodyPnts = getBezierPoints(rrBodyPnts.concat(llBodyPnts.slice(1)));
    lrBodyPnts = getBezierPoints(lrBodyPnts);

    const coords = rlBodyPnts.concat(
      rArrowPnts,
      bodyPnts,
      lArrowPnts,
      lrBodyPnts
    );

    // console.log("double arrow coords", coords);

    return coords;
  }
}

// P.Plot.DoubleArrow.prototype.finishDrawing = function () {
//   if (this.getPointCount() == 3 && this.tempPoint4 != null)
//     this.points.push(this.tempPoint4);
//   if (this.connPoint != null) this.points.push(this.connPoint);
// };
