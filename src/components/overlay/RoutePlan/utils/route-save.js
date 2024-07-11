import _ from "lodash";
import { request } from "@/utils/api/request.ts";

function createRouteExamTask(siteId, taskName, points) {
  const data = {
    siteId,
    name: taskName,
    // applyList:
  };

  if (points !== null) {
    data.byHand = true;
    data.pointList = [
      `${points[0].geometry.coordinates[0]},${points[0].geometry.coordinates[1]}`,
      [
        points[1].id,
        points[2].id,
        points[3].id,
        points[4].id,
        points[5].id,
      ].join(","),
      `${points[6].geometry.coordinates[0]},${points[6].geometry.coordinates[1]}`,
    ];
  }

  return request({
    url: "/exam/route/create",
    method: "POST",
    data: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function createBatchRouteExamTask(siteId, taskName, startEnd, lineCount) {
  const data = {
    siteId,
    name: taskName,
  };

  data.byHand = false;
  data.pointList = [
    `${startEnd[0].geometry.coordinates[0]},${startEnd[0].geometry.coordinates[1]}`,
    `${lineCount}`,
    `${startEnd[1].geometry.coordinates[0]},${startEnd[1].geometry.coordinates[1]}`,
  ];

  return request({
    url: "/exam/route/create",
    method: "POST",
    data: JSON.stringify(data),
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

  // for (let i = 0; i <= allPoints.length - 2; i++) {
  //   promises.push(
  //     createRouteSegment(
  //       zoneId,
  //       allPoints[i].geometry.coordinates,
  //       allPoints[i + 1].geometry.coordinates,
  //       threshold,
  //     ),
  //   );
  // }

  try {
    // const segmentResps = await Promise.all(promises);
    // const segIds = [];
    //
    // _.each(segmentResps, (segment) => {});

    const examRes = await createRouteExamTask(zoneId, taskName, allPoints);
    if (examRes && examRes.code === 200) {
      return true;
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function saveBatchCreateRoute(
  zoneId,
  taskName,
  start,
  end,
  batchCount,
  batchStrategy,
) {
  try {
    const examRes = await createBatchRouteExamTask(
      zoneId,
      taskName,
      [start, end],
      batchCount,
    );
    if (examRes && examRes.code === 200) {
      return true;
    } else {
      return Promise.reject();
    }
  } catch (e) {
    return Promise.reject(e);
  }
}
