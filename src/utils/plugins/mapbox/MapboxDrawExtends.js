import _ from "lodash";
// import DrawRectanglePlugin from "@/utils/plugins/mapbox/DrawRectanglePlugin.js";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import { DrawIcon } from "./DrawIconPlugin.js";
import { DrawText } from "./DrawTextPlugin.js";
import { DrawCircle } from "./DrawCirclePlugin.js";
import { DrawEllipse } from "./DrawEllipsePlugin.js";
import { DrawAttackArrow } from "./DrawAttackArrowPlugin";
import { DrawDoubleArrow } from "./DrawDoubleArrowPlugin";
import { DrawThreeArrow } from "./DrawThreeArrowPlugin";


export const MapboxDrawExtends = {
  draw_rectangle: DrawRectangle,
  draw_icon: DrawIcon,
  draw_text: DrawText,
  draw_circle: DrawCircle,
  draw_ellipse: DrawEllipse,
  draw_attack_arrow: DrawAttackArrow,
  draw_double_arrow: DrawDoubleArrow,
  draw_three_arrow: DrawThreeArrow,
};

// const PluginsList = [
//   DrawRectanglePlugin,
//   DrawIconPlugin,
//   DrawTextPlugin,
//   DrawCirclePlugin,
//   DrawEllipsePlugin,
//   DrawAttackArrowPlugin,
//   DrawDoubleArrowPlugin,
//   DrawThreeArrowPlugin,
// ];
