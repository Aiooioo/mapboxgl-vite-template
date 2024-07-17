import { defineAsyncComponent } from "vue";

export const CUS_TOOL_COMPS = [
  {
    title: "标注设置",
    component: defineAsyncComponent(() => import("./PlotSetting/index.vue")),
  },
];

export const PLOT_LIST = [
  {
    title: "箭头",
    name: "arrow",
    children: [
      {
        title: "单箭头",
        name: "draw_attack_arrow",
        mode: "draw_attack_arrow",
      },
      {
        title: "双箭头",
        name: "draw_double_arrow",
        mode: "draw_double_arrow",
      },
      {
        title: "三箭头",
        name: "draw_three_arrow",
        mode: "draw_three_arrow",
      },
    ],
  },
  {
    title: "自定义",
    name: "custom",
    children: [
      {
        title: "文本",
        name: "draw_text",
        mode: "draw_text",
      },
      {
        title: "图标",
        name: "draw_icon",
        mode: "draw_icon",
      },
      {
        title: "圆",
        name: "draw_circle",
        mode: "draw_circle",
      },
      {
        title: "椭圆",
        name: "draw_ellipse",
        mode: "draw_ellipse",
      },
      {
        title: "矩形",
        name: "draw_rectangle",
        mode: "draw_rectangle",
      },
    ],
  },
  {
    title: "内置",
    name: "default",
    children: [
      {
        title: "线",
        name: "draw_line_string",
        mode: "draw_line_string",
      },
      {
        title: "面",
        name: "draw_polygon",
        mode: "draw_polygon",
      },
      {
        title: "点",
        name: "draw_point",
        mode: "draw_point",
      },
    ],
  },
];
