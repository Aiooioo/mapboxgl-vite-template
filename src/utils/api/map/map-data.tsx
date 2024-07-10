import { request } from "@/utils/api/request";

//地图服务列表
export function $dataList(data) {
  return request({
    url: "/map/data/searchList",
    method: "post",
    data,
  });
}

export function $createItem(data) {
  return request({
    url: "/map/data/insert",
    method: "post",
    data,
  });
}
export function $createItembyMap(data) {
  return request({
    url: "/map/data/create",
    method: "post",
    data,
  });
}
export function $updateItem(data) {
  return request({
    url: "/map/data/update",
    method: "post",
    data,
  });
}
export function $deleteItem(data) {
  return request({
    url: `/map/data/delete`,
    method: "post",
    data,
  });
}
