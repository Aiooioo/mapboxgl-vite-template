//匿名自执行函数
(function () {
  window.prodConfig = {
    baseUrl: "/topo-map-imagery",
    apiUrl: "https://whps.gis.test/topo",
    wsUrl: "ws://192.168.0.215:8877/im",
    login: {
      password: "macro123",
      relogin: "../login/",
      username: "admin",
    },
    message: {
      closable: true,
      duration: 3000,
      keepAliveOnHover: true,
      level: ["error"],
    },
  };
})();
