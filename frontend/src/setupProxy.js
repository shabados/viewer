// Only runs in dev - proxies requests to /api to backend
const proxy = require( 'http-proxy-middleware' ) // eslint-disable-line import/no-extraneous-dependencies

const target = process.env.DEV_BACKEND_URL || 'http://localhost:52525'

module.exports = app => {
  app.use( proxy( '/api', { target, pathRewrite: { '^/api': '/' } } ) )
}
