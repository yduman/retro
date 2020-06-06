const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.DEV_ENV === "DOCKER") {
    const dockerHostIp = process.env.DOCKER_HOST_IP || "host.docker.internal";
    app.use(
      "/api/*",
      createProxyMiddleware({
        target: `http://${dockerHostIp}:3001`,
        changeOrigin: true,
      })
    );
  } else {
    app.use(
      "/api/*",
      createProxyMiddleware({
        target: "http://localhost:3001",
        changeOrigin: true,
      })
    );
  }
};
