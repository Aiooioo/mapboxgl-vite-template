export interface IConfig {
  apiUrl: "http://192.168.0.215:7001";
  login: {
    password: "macro123";
    relogin: "../login/";
    username: "admin";
  };
  message: {
    closable: true;
    duration: 3000;
    keepAliveOnHover: true;
    level: ["error", "spin"];
  };
  portal: {
    password: "esri1234";
    portalurl: "https://whps.gis.test/arcgis/";
    username: "admin";
  };
}

console.log(import.meta, "--import.meta");

const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const forceProd = import.meta.env.VITE_DEBUG_RELEASE === "1";
const data = isProd || forceProd ? window.prodConfig : window.devConfig;
export const config = Object.freeze(data);
