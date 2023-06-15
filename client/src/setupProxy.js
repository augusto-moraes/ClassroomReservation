const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://tc405-112-14.insa-lyon.fr:3001',
      changeOrigin: true,
    })
  );
};