import _ from "lodash";
import { request } from "@/utils/api/request.ts";

function createRouteExamTask(siteId, taskName, ) {
  return request({
    url: '/exam/route/create',
    method: 'POST',
    data: JSON.stringify({
      siteId,
      name: taskName,
      // applyList:
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function createRouteSegment(siteId, segStart, segEnd, threshold) {
  return request({
    url: "/map/route/create",
    method: "POST",
    data: JSON.stringify({
      siteId,
      jointPoints: [
        `${segStart[0]},${segStart[1]}`,
        `${segEnd[0]},${segEnd[1]}`,
      ],
      thresholds: [threshold],
    }),
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 3 * 60 * 1000,
  });
}

export function saveAddNewRoute(zoneId, start, end, checkPoints, threshold) {
  const allPoints = [start, ...checkPoints, end];

  const promises = [];

  for (let i = 0; i <= allPoints.length - 2; i++) {
    promises.push(
      createRouteSegment(
        zoneId,
        allPoints[i].geometry.coordinates,
        allPoints[i + 1].geometry.coordinates,
        threshold,
      ),
    );
  }

  Promise.all(promises).then(([...segments]) => {
    const segIds = [];

    _.each(segments, (segment) => {

    })
  });
}
