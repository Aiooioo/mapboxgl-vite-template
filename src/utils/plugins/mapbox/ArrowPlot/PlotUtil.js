export const HALF_PI = Math.PI / 2;
export const TWO_PI = Math.PI * 2;

export function isClockWise(pnt1, pnt2, pnt3) {
  return (
    (pnt3[1] - pnt1[1]) * (pnt2[0] - pnt1[0]) >
    (pnt2[1] - pnt1[1]) * (pnt3[0] - pnt1[0])
  );
}

export function calcMid(pnt1, pnt2) {
  return [(pnt1[0] + pnt2[0]) / 2, (pnt1[1] + pnt2[1]) / 2];
}

export function calcDistance(pnt1, pnt2) {
  return Math.sqrt(
    Math.pow(pnt1[0] - pnt2[0], 2) + Math.pow(pnt1[1] - pnt2[1], 2)
  );
}

export function getBaseLength(points) {
  return Math.pow(wholeDistance(points), 0.99);
}

export function wholeDistance(points) {
  let distance = 0;
  for (let i = 0; i < points.length - 1; i++)
    distance += calcDistance(points[i], points[i + 1]);
  return distance;
}

export function getQBSplinePoints(points) {
  if (points.length <= 2) return points;

  const n = 2;

  const bSplinePoints = [];
  const m = points.length - n - 1;
  bSplinePoints.push(points[0]);

  for (let i = 0; i <= m; i++) {
    for (let t = 0; t <= 1; t += 0.05) {
      let y = 0;
      let x = 0;
      for (let k = 0; k <= n; k++) {
        const factor = getQuadricBSplineFactor(k, t);
        x += factor * points[i + k][0];
        y += factor * points[i + k][1];
      }
      bSplinePoints.push([x, y]);
    }
  }
  bSplinePoints.push(points[points.length - 1]);
  return bSplinePoints;
}

export function getQuadricBSplineFactor(k, t) {
  if (k == 0) return Math.pow(t - 1, 2) / 2;
  if (k == 1) return (-2 * Math.pow(t, 2) + 2 * t + 1) / 2;
  if (k == 2) return Math.pow(t, 2) / 2;
  return 0;
}

export function getThirdPoint(startPnt, endPnt, angle, distance, clockWise) {
  const azimuth = getAzimuth(startPnt, endPnt);
  const alpha = clockWise ? azimuth + angle : azimuth - angle;
  const dx = distance * Math.cos(alpha);
  const dy = distance * Math.sin(alpha);

  return [endPnt[0] + dx, endPnt[1] + dy];
}

export function getAngleOfThreePoints(pntA, pntB, pntC) {
  const angle = getAzimuth(pntB, pntA) - getAzimuth(pntB, pntC);
  return angle < 0 ? angle + TWO_PI : angle;
}

export function getAzimuth(startPnt, endPnt) {
  let azimuth;

  const angle = Math.asin(
    Math.abs(endPnt[1] - startPnt[1]) / calcDistance(startPnt, endPnt)
  );

  if (endPnt[1] >= startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = angle + Math.PI;
  else if (endPnt[1] >= startPnt[1] && endPnt[0] < startPnt[0])
    azimuth = TWO_PI - angle;
  else if (endPnt[1] < startPnt[1] && endPnt[0] < startPnt[0]) azimuth = angle;
  else if (endPnt[1] < startPnt[1] && endPnt[0] >= startPnt[0])
    azimuth = Math.PI - angle;

  return azimuth;
}

export function getBezierPoints(points) {
  if (points.length <= 2) return points;

  const bezierPoints = [];
  const n = points.length - 1;
  for (let t = 0; t <= 1; t += 0.01) {
    let y = 0;
    let x = 0;
    for (let index = 0; index <= n; index++) {
      const factor = getBinomialFactor(n, index);
      const a = Math.pow(t, index);
      const b = Math.pow(1 - t, n - index);
      x += factor * a * b * points[index][0];
      y += factor * a * b * points[index][1];
    }
    bezierPoints.push([x, y]);
  }
  bezierPoints.push(points[n]);
  return bezierPoints;
}

function getBinomialFactor(n, index) {
  return getFactorial(n) / (getFactorial(index) * getFactorial(n - index));
}

function getFactorial(n) {
  if (n <= 1) return 1;
  if (n == 2) return 2;
  if (n == 3) return 6;
  if (n == 4) return 24;
  if (n == 5) return 120;

  let result = 1;
  for (let i = 1; i <= n; i++) result *= i;
  return result;
}
