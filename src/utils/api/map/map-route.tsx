import { request } from "@/utils/api/request";

//地图服务列表
export function $dataList(data) {
  return request({
    url: "/map/route/list",
    method: "post",
    data,
  });
}

export function $createItem(data) {
  return request({
    url: "/map/site/create",
    method: "post",
    data,
  });
}
export function $updateItem(data) {
  return request({
    url: "/map/site/update",
    method: "post",
    data,
  });
}
export function $deleteItem(data) {
  return request({
    url: `/map/route/delete/${data.id}`,
    method: "post",
  });
}
export function $lineTypes(data) {
  return request({
    url: `/map/route/strategies`,
    method: "get",
  });
}
