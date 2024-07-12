import _ from "lodash";
import debug from "debug";

const colors = {
  red: {
    terminal: 1,
    rgb: "#ff0000",
  },
  green: {
    terminal: 2,
    rgb: "#00a000",
  },
  yellow: {
    terminal: 3,
    rgb: "#fcae05",
  },
  magenta: {
    terminal: 4,
    rgb: "#ad9aaf",
  },
  blue: {
    terminal: 5,
    rgb: "#004fd8",
  },
  gray: {
    terminal: 7,
    rgb: "#777777",
  },
};

const levels = {
  cfg: {
    color: colors.blue,
    suffix: "CFG",
  },
  dbg: {
    color: colors.magenta,
    suffix: "DBG",
  },
  log: {
    color: colors.gray,
    suffix: "LOG",
  },
  info: {
    color: colors.green,
    suffix: "INF",
  },
  warn: {
    color: colors.yellow,
    suffix: "WRN",
  },
  error: {
    color: colors.red,
    suffix: "ERR",
  },
};

export const nsLogger = {
  create(namespace) {
    const nsl = {
      handlers: {},
    };

    _.each(_.entries(levels), ([lvlName, lvlInfo]) => {
      Object.defineProperty(nsl, lvlName, {
        get() {
          if (!nsl.handlers[lvlName]) {
            if (!nsl.instance) {
              nsl.instance = debug(namespace);
            }

            const handler = nsl.instance.extend(lvlInfo.suffix);

            handler.log = console.log.bind(console);

            const colorKey = window ? "rgb" : "terminal";
            handler.color = lvlInfo.color[colorKey];
            handler.useColors = true;

            nsl.handlers[lvlName] = handler;
          }

          return nsl.handlers[lvlName];
        },
      });
    });

    return nsl;
  },
  init(namespaceList) {
    const namespaces = namespaceList.join(",");

    debug.enable(namespaces);
  },
};
