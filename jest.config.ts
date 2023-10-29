import { alias as webpackAlias } from './webpack.base.config';

const alias = Object.keys(webpackAlias).reduce((agg, jsPath) => {
  const pathPattern = `${jsPath.replace('@', '^@')}(.*)$`;
  return { ...agg, [pathPattern]: `${(webpackAlias as any)[jsPath]}$1` };
}, {});

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/shared/**/testUtil.ts'],
  setupFiles: ['react-app-polyfill/jsdom'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    ...alias,
  },
  setupFilesAfterEnv: ['<rootDir>/jestSetup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '\\.[jt]sx?$': ['esbuild-jest', { sourcemap: true, target: 'es2017' }],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$'],
  coverageReporters: ['html'],
  coverageThreshold: {
    global: { branches: 0, functions: 0, lines: 0, statements: 0 },
  },
  testEnvironment: 'jsdom',
  resetMocks: true,
  modulePaths: [],
};
