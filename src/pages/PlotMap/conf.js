import { defineAsyncComponent } from "vue";

export const CUS_TOOL_COMPS = [
  // {
  //   title: "地图标注",
  //   component: defineAsyncComponent(
  //     () => import("@/components/overlay/SimpleDrawing/DrawingPane.vue")
  //   ),
  // },
  {
    title: "标注设置",
    component: defineAsyncComponent(() => import("./PlotSetting.vue")),
  },
];

export const PLOT_LIST = [
  {
    title: "箭头",
    name: "arrow",
    children: [
      {
        title: "单箭头",
        name: "one_arrow",
        mode: "draw_attack_arrow",
      },
      {
        title: "双箭头",
        name: "two_arrow",
        mode: "draw_double_arrow",
      },
      {
        title: "三箭头",
        name: "three_arrow",
        mode: "draw_three_arrow",
      },
    ],
  },
];
