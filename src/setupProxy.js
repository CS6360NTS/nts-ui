const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://34.66.65.153:8080',
      changeOrigin: true,
    })
  );
};
