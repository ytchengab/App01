const proxy = require('http-proxy-middleware');
const morgan = require("morgan");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: "https://c86e0d6a46c3464b84e816edd7272c89.vfs.cloud9.us-east-1.amazonaws.com:8080",
      changeOrigin: true
    })
  );

  app.use(morgan('combined'));
};
