import _ from "lodash";
import { request } from "@/utils/api/request.ts";

function createRouteExamTask(siteId, taskName) {
  return request({
    url: "/exam/route/create",
    method: "POST",
    data: JSON.stringify({
      siteId,
      name: taskName,
      // applyList:
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
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

export async function saveAddNewRoute(
  zoneId,
  taskName,
  start,
  end,
  checkPoints,
  threshold,
) {
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

  try {
    const segmentResps = await Promise.all(promises);
    const segIds = [];

    _.each(segmentResps, (segment) => {});

    const examRes = await createRouteExamTask(zoneId, taskName, segIds);
    if (examRes && examRes.code === 200) {
      return true;
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
