import {
  calcMid,
  getBezierPoints,
  getTempPoint4,
  isClockWise,
} from "./PlotUtil";
import DoubleArrow from "./DoubleArrow";
import AttackArrow from "./AttackArrow";

export default class ThreeArrow {
  static headHeightFactor = 0.25;
  static headWidthFactor = 0.3;
  static neckHeightFactor = 0.85;
  static neckWidthFactor = 0.15;

  constructor() {}

  static generate(pnts) {
    const pnt1 = pnts[0];
    const pnt2 = pnts[1];
    const pnt3 = pnts[2];
    const count = pnts.length; // 获取已经点击的坐标数

    let tempPoint4;
    let tempPoint5;

    // 计算第 4、5 个点
    if (count == 3) {
      // 鼠标绘制了三个点
      // 第四个点为第三个点的对称点
      // 第五个点是第三个点和第四个点的中点
      tempPoint4 = getTempPoint4(pnt1, pnt2, pnt3);
      tempPoint5 = calcMid(pnt3, tempPoint4);
    } else if (count == 4) {
      // 鼠标绘制了四个点
      // 第五个点是第三个点和第四个点的中点
      tempPoint4 = pnts[3];
      tempPoint5 = calcMid(pnt3, tempPoint4);
    } else {
      tempPoint4 = pnts[3];
      tempPoint5 = pnts[4];
    }

    const connPoint = calcMid(pnt1, pnt2);
    let leftArrowPnts, rightArrowPnts;

    // 判断是否为顺时针绘制
    if (isClockWise(pnt1, pnt2, pnt3)) {
      leftArrowPnts = DoubleArrow.getArrowPoints(
        pnt1,
        connPoint,
        tempPoint4,
        false
      );
      rightArrowPnts = DoubleArrow.getArrowPoints(connPoint, pnt2, pnt3, true);
    } else {
      leftArrowPnts = DoubleArrow.getArrowPoints(pnt2, connPoint, pnt3, false);
      rightArrowPnts = DoubleArrow.getArrowPoints(
        connPoint,
        pnt1,
        tempPoint4,
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
    const centerPnts = rrBodyPnts.concat(llBodyPnts.slice(1));
    lrBodyPnts = getBezierPoints(lrBodyPnts);

    const centerArrowPnts = AttackArrow.generate([
      centerPnts[2],
      centerPnts[4],
      tempPoint5,
    ]);

    const canterLen = centerPnts.length;
    const centerArowLen = centerArrowPnts.length;
    const clMid = calcMid(centerArrowPnts[0], centerArrowPnts[1]);
    const clPnts = getBezierPoints([
      centerPnts[0],
      centerPnts[1],
      centerPnts[2],
      centerArrowPnts[0],
      clMid,
    ]);

    const crMid = calcMid(
      centerArrowPnts[centerArowLen - 2],
      centerArrowPnts[centerArowLen - 1]
    );
    const crPnts = getBezierPoints([
      crMid,
      centerArrowPnts[centerArowLen - 1],
      centerPnts[canterLen - 3],
      centerPnts[canterLen - 2],
      centerPnts[canterLen - 1],
    ]);

    const center = centerArrowPnts.slice(2, centerArowLen - 2);
    const newCenterArrowPnts = [...clPnts, ...center, ...crPnts];

    const coords = rlBodyPnts.concat(
      rArrowPnts,
      newCenterArrowPnts,
      lArrowPnts,
      lrBodyPnts
    );

    return coords;
  }
}
