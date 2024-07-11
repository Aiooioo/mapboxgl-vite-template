import {
  HALF_PI,
  isClockWise,
  calcMid,
  calcDistance,
  wholeDistance,
  getThirdPoint,
  getBaseLength,
  getQBSplinePoints,
} from "./PlotUtil";

export default class AttackArrow {
  static headHeightFactor = 0.18;
  static headWidthFactor = 0.3;
  static neckHeightFactor = 0.85;
  static neckWidthFactor = 0.15;
  static headTailFactor = 0.8;

  constructor() {}

  static getArrowHeadPoints(points, tailLeft, tailRight) {
    let len = getBaseLength(points);
    let headHeight = len * this.headHeightFactor;
    const headPnt = points[points.length - 1];
    len = calcDistance(headPnt, points[points.length - 2]);
    const tailWidth = calcDistance(tailLeft, tailRight);
    if (headHeight > tailWidth * this.headTailFactor) {
      headHeight = tailWidth * this.headTailFactor;
    }
    const headWidth = headHeight * this.headWidthFactor;
    const neckWidth = headHeight * this.neckWidthFactor;
    headHeight = headHeight > len ? len : headHeight;
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
      const angle =
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

  static generate(pnts) {
    // 计算箭尾
    let tailLeft = pnts[0];
    let tailRight = pnts[1];
    if (isClockWise(pnts[0], pnts[1], pnts[2])) {
      tailLeft = pnts[1];
      tailRight = pnts[0];
    }
    const midTail = calcMid(tailLeft, tailRight);
    const bonePnts = [midTail].concat(pnts.slice(2));

    // 计算箭头
    const headPnts = this.getArrowHeadPoints(bonePnts, tailLeft, tailRight);
    const neckLeft = headPnts[0];
    const neckRight = headPnts[4];
    const tailWidthFactor =
      calcDistance(tailLeft, tailRight) / getBaseLength(bonePnts);

    // 计算箭身
    const bodyPnts = this.getArrowBodyPoints(
      bonePnts,
      neckLeft,
      neckRight,
      tailWidthFactor
    );

    // 整合
    const count = bodyPnts.length;
    let leftPnts = [tailLeft].concat(bodyPnts.slice(0, count / 2));
    leftPnts.push(neckLeft);
    let rightPnts = [tailRight].concat(bodyPnts.slice(count / 2, count));
    rightPnts.push(neckRight);

    leftPnts = getQBSplinePoints(leftPnts);
    rightPnts = getQBSplinePoints(rightPnts);

    const coords = leftPnts.concat(headPnts, rightPnts.reverse());

    return coords;
  }
}
