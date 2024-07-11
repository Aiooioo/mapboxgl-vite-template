import _ from "lodash";

export function generateLineSchema(allZonePoints, batchCount) {
  return new Promise((res) => {
    res(_.times(batchCount, () => _.sampleSize(allZonePoints.features, 5)));
  });
}
