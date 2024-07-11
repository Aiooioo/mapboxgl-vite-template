import {
  calcDistance,
  calcMid,
  getAngleOfThreePoints,
  getBaseLength,
  getBezierPoints,
  getThirdPoint,
  HALF_PI,
  isClockWise,
  wholeDistance,
} from "./PlotUtil";

export default class ThreeArrow {
  static connPoint = null;
  static tempPoint4 = null;
  static tempPoint5 = null;

  static headHeightFactor = 0.25;
  static headWidthFactor = 0.3;
  static neckHeightFactor = 0.85;
  static neckWidthFactor = 0.15;

  constructor() {}

  static getArrowBodyPoints(t, o, e, r) {
    const n = wholeDistance(t);
    const g = getBaseLength(t);
    const i = g * r;
    const s = calcDistance(o, e);
    const a = (i - s) / 2;
    const u = [];
    const c = [];
    let l = 0;

    for (let p = 1; p < t.length - 1; p++) {
      const h = getAngleOfThreePoints(t[p - 1], t[p], t[p + 1]) / 2;
      l += calcDistance(t[p - 1], t[p]);

      const d = (i / 2 - (l / n) * a) / Math.sin(h),
        f = getThirdPoint(t[p - 1], t[p], Math.PI - h, d, !0),
        E = getThirdPoint(t[p - 1], t[p], h, d, !1);

      u.push(f), c.push(E);
    }
    return u.concat(c);
  }

  static getArrowHeadPoints(t, o, e) {
    const r = getBaseLength(t),
      n = r * this.headHeightFactor,
      g = t[t.length - 1],
      i = (calcDistance(o, e), n * this.headWidthFactor),
      s = n * this.neckWidthFactor,
      a = n * this.neckHeightFactor,
      l = getThirdPoint(t[t.length - 2], g, 0, n, !0),
      u = getThirdPoint(t[t.length - 2], g, 0, a, !0),
      c = getThirdPoint(g, l, HALF_PI, i, !1),
      p = getThirdPoint(g, l, HALF_PI, i, !0),
      h = getThirdPoint(g, u, HALF_PI, s, !1),
      d = getThirdPoint(g, u, HALF_PI, s, !0);
    return [h, c, g, p, d];
  }

  static getArrowPoints(t, o, e, r) {
    var n = calcMid(t, o),
      g = calcDistance(n, e),
      i = getThirdPoint(e, n, 0, 0.3 * g, !0),
      s = getThirdPoint(e, n, 0, 0.5 * g, !0);
    (i = getThirdPoint(n, i, HALF_PI, g / 5, r)),
      (s = getThirdPoint(n, s, HALF_PI, g / 4, r));
    var a = [n, i, s, e],
      l = this.getArrowHeadPoints(
        a,
        this.headHeightFactor,
        this.headWidthFactor,
        this.neckHeightFactor,
        this.neckWidthFactor
      ),
      u = l[0],
      c = l[4],
      p = calcDistance(t, o) / getBaseLength(a) / 2,
      h = this.getArrowBodyPoints(a, u, c, p),
      d = h.length,
      f = h.slice(0, d / 2),
      E = h.slice(d / 2, d);
    return (
      f.push(u),
      E.push(c),
      (f = f.reverse()),
      f.push(o),
      (E = E.reverse()),
      E.push(t),
      f.reverse().concat(l, E)
    );
  }

  static getTempPoint4(t, o, e) {
    var r,
      n,
      g,
      i,
      s = calcMid(t, o),
      a = calcDistance(s, e),
      l = getAngleOfThreePoints(t, s, e);

    return (
      l < HALF_PI
        ? ((n = a * Math.sin(l)),
          (g = a * Math.cos(l)),
          (i = getThirdPoint(t, s, HALF_PI, n, !1)),
          (r = getThirdPoint(s, i, HALF_PI, g, !0)))
        : l >= HALF_PI && l < Math.PI
          ? ((n = a * Math.sin(Math.PI - l)),
            (g = a * Math.cos(Math.PI - l)),
            (i = getThirdPoint(t, s, HALF_PI, n, !1)),
            (r = getThirdPoint(s, i, HALF_PI, g, !1)))
          : l >= Math.PI && l < 1.5 * Math.PI
            ? ((n = a * Math.sin(l - Math.PI)),
              (g = a * Math.cos(l - Math.PI)),
              (i = getThirdPoint(t, s, HALF_PI, n, !0)),
              (r = getThirdPoint(s, i, HALF_PI, g, !0)))
            : ((n = a * Math.sin(2 * Math.PI - l)),
              (g = a * Math.cos(2 * Math.PI - l)),
              (i = getThirdPoint(t, s, HALF_PI, n, !0)),
              (r = getThirdPoint(s, i, HALF_PI, g, !1))),
      r
    );
  }

  static generate(pnts) {
    const result = {
      controlPoint: null,
      polygonalPoint: null,
    };

    const o = pnts[0], //第一个点
      e = pnts[1], //第二个点
      r = pnts[2], //第三个点
      t = pnts.length; //获取已经点击的坐标数

    //下面的是移动点位后的坐标
    if (t == 3) {
      this.tempPoint4 = this.getTempPoint4(o, e, r);
      this.tempPoint5 = calcMid(r, this.tempPoint4);
    } else {
      this.tempPoint4 = pnts[3];
      this.tempPoint5 = pnts[4];
    }

    if (t < 6) {
      this.connPoint = calcMid(o, e);
    } else {
      this.connPoint = pnts[5];
    }

    let n, g;
    if (isClockWise(o, e, r)) {
      n = this.getArrowPoints(o, this.connPoint, this.tempPoint4, !1);
      g = this.getArrowPoints(this.connPoint, e, r, !0);
    } else {
      n = this.getArrowPoints(e, this.connPoint, r, !1);
      g = this.getArrowPoints(this.connPoint, o, this.tempPoint4, !0);
    }

    var i = n.length,
      s = (i - 5) / 2,
      a = n.slice(0, s),
      l = n.slice(s, s + 5),
      u = n.slice(s + 5, i),
      c = g.slice(0, s),
      p = g.slice(s, s + 5),
      h = g.slice(s + 5, i);
    c = getBezierPoints(c);

    const d = getBezierPoints(h.concat(a.slice(1)));
    u = getBezierPoints(u);

    const f = c.concat(p, d, l, u);
    const newArray = f;
    result.controlPoint = [
      o,
      e,
      r,
      this.tempPoint4,
      this.tempPoint5,
      this.connPoint,
    ];

    result.polygonalPoint = newArray;

    console.log("controlPoint", newArray);

    return newArray;
  }
}
