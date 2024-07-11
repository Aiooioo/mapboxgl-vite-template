import _ from "lodash";
import DrawRectanglePlugin from "@/utils/plugins/mapbox/DrawRectanglePlugin.js";
import DrawIconPlugin from "@/utils/plugins/mapbox/DrawIconPlugin.js";
import DrawTextPlugin from "@/utils/plugins/mapbox/DrawTextPlugin.js";
import DrawCirclePlugin from "@/utils/plugins/mapbox/DrawCirclePlugin.js";
import DrawEllipsePlugin from "@/utils/plugins/mapbox/DrawEllipsePlugin.js";
import DrawAttackArrowPlugin from "./plugins/mapbox/DrawAttackArrowPlugin";
import DrawDoubleArrowPlugin from "./plugins/mapbox/DrawDoubleArrowPlugin";
import DrawThreeArrowPlugin from "./plugins/mapbox/DrawThreeArrowPlugin";

const PluginsList = [
  DrawRectanglePlugin,
  DrawIconPlugin,
  DrawTextPlugin,
  DrawCirclePlugin,
  DrawEllipsePlugin,
  DrawAttackArrowPlugin,
  DrawDoubleArrowPlugin,
  DrawThreeArrowPlugin,
];

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  addPlugin(plugin) {
    this.plugins.push(plugin);
  }

  registerAll() {
    _.each(this.plugins, (plugin) => {
      plugin.attach();
    });
  }
}

const manager = new PluginManager();

_.each(PluginsList, (Plugin) => {
  manager.addPlugin(new Plugin());
});

export default manager;
