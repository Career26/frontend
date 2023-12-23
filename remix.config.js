/** @type {import('@remix-run/dev').AppConfig} */
export default {
  postcss: true,
  ignoredRouteFiles: ['**/.*'],
  browserNodeBuiltinsPolyfill: { modules: { url: true, buffer: true } },
  serverDependenciesToBundle: [
    'react',
    'node:stream',
    '@remix-run/node',
    '@remix-run/react',
    'isbot',
    'react-dom/server',
    'react-jsx-runtime',
    /@mantine/,
    '@aws-amplify/ui-react',
  ],
};
