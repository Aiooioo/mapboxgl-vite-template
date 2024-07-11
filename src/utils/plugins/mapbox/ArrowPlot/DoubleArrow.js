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
    const midPnt = calcMid(pnt1, pnt2);
    const len = calcDistance(midPnt, pnt3);
    let midPnt1 = getThirdPoint(pnt3, midPnt, 0, len * 0.3, true);
    let midPnt2 = getThirdPoint(pnt3, midPnt, 0, len * 0.5, true);
    midPnt1 = getThirdPoint(midPnt, midPnt1, HALF_PI, len / 5, clockWise);
    midPnt2 = getThirdPoint(midPnt, midPnt2, HALF_PI, len / 4, clockWise);

    const points = [midPnt, midPnt1, midPnt2, pnt3];

    // 计算箭头部分
    const arrowPnts = this.getArrowHeadPoints(points);
    const neckLeftPoint = arrowPnts[0];
    const neckRightPoint = arrowPnts[4];

    // 计算箭身部分
    const tailWidthFactor =
      calcDistance(pnt1, pnt2) / getBaseLength(points) / 2;
    const bodyPnts = this.getArrowBodyPoints(
      points,
      neckLeftPoint,
      neckRightPoint,
      tailWidthFactor
    );
    const n = bodyPnts.length;
    let lPoints = bodyPnts.slice(0, n / 2);
    let rPoints = bodyPnts.slice(n / 2, n);
    lPoints.push(neckLeftPoint);
    rPoints.push(neckRightPoint);
    lPoints = lPoints.reverse();
    lPoints.push(pnt2);
    rPoints = rPoints.reverse();
    rPoints.push(pnt1);

    return lPoints.reverse().concat(arrowPnts, rPoints);
  }

  static getArrowHeadPoints(points) {
    const len = getBaseLength(points);
    const headHeight = len * this.headHeightFactor;
    const headPnt = points[points.length - 1];
    const headWidth = headHeight * this.headWidthFactor;
    const neckWidth = headHeight * this.neckWidthFactor;
    const neckHeight = headHeight * this.neckHeightFactor;

    const headEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      headHeight,
      true
    );

    const neckEndPnt = getThirdPoint(
      points[points.length - 2],
      headPnt,
      0,
      neckHeight,
      true
    );

    const headLeft = getThirdPoint(
      headPnt,
      headEndPnt,
      HALF_PI,
      headWidth,
      false
    );

    const headRight = getThirdPoint(
      headPnt,
      headEndPnt,
      HALF_PI,
      headWidth,
      true
    );

    const neckLeft = getThirdPoint(
      headPnt,
      neckEndPnt,
      HALF_PI,
      neckWidth,
      false
    );

    const neckRight = getThirdPoint(
      headPnt,
      neckEndPnt,
      HALF_PI,
      neckWidth,
      true
    );

    return [neckLeft, headLeft, headPnt, headRight, neckRight];
  }

  static getArrowBodyPoints(points, neckLeft, neckRight, tailWidthFactor) {
    const allLen = wholeDistance(points);
    const len = getBaseLength(points);
    const tailWidth = len * tailWidthFactor;
    const neckWidth = calcDistance(neckLeft, neckRight);
    const widthDif = (tailWidth - neckWidth) / 2;
    let tempLen = 0,
      leftBodyPnts = [],
      rightBodyPnts = [];
    for (let i = 1; i < points.length - 1; i++) {
      let angle =
        getAngleOfThreePoints(points[i - 1], points[i], points[i + 1]) / 2;
      tempLen += calcDistance(points[i - 1], points[i]);
      const w =
        (tailWidth / 2 - (tempLen / allLen) * widthDif) / Math.sin(angle);
      const left = getThirdPoint(
        points[i - 1],
        points[i],
        Math.PI - angle,
        w,
        true
      );
      const right = getThirdPoint(points[i - 1], points[i], angle, w, false);
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

    return coords;
  }
}
