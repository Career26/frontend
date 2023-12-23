/** @type {import('@remix-run/dev').AppConfig} */
export default {
  postcss: true,
  ignoredRouteFiles: ['**/.*'],
  browserNodeBuiltinsPolyfill: { modules: { url: true, buffer: true } },
};
