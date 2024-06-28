import axios from "axios";
export interface IConfig {
  baseUrl: string;
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
}

console.log(import.meta.env, "--import.meta.env");
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
const forceProd = import.meta.env.VITE_DEBUG_RELEASE;

const { data }: { data: IConfig } = await axios(
  isProd || forceProd ? "config/config.release.json" : "config/config.json",
);
export const config = Object.freeze(data);
