import { toValue } from "vue";

export function validateSingleRoute(
  taskName,
  startRef,
  endRef,
  checkPointsRef,
) {
  const name = toValue(taskName);
  const start = toValue(startRef);
  const end = toValue(endRef);
  const checkPoints = toValue(checkPointsRef);

  if (!name || name.trim().length === 0) {
    throw new Error("必须为本次定向越野活动指定一个名称");
  }

  if (!start) {
    throw new Error("必须为定向越野活动指定一个起始点");
  }

  if (!end) {
    throw new Error("必须为定向越野活动指定一个终止点");
  }

  if (!checkPoints || checkPoints.length < 5) {
    throw new Error("定向越野活动必须经过 5 个检查点");
  }

  return true;
}
