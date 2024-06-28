interface IPlotMarker {
  cid: string; // 标注id
  id: string; // 服务端生成
  marker: mapboxgl.Marker; // 标注对象
  el: HTMLElement; // 标注DOM元素
  listener: any; //标注点击事件监听器
  geometry: any; // 标注几何信息
  type: string; // 标注类型
  code: string; // 标注类型
  style: string; // 标注样式
  remark: string; // 备注信息
}
