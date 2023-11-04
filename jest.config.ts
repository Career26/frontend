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
  setupFiles: ['react-app-polyfill/jsdom', '<rootDir>/jest/jest.polyfills.js'],
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileMock.js',
    '\\.(scss|css|less)$': '<rootDir>/jest/styleMock.js',
    ...alias,
  },
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transform: {
    '\\.[jt]sx?$': ['esbuild-jest', { sourcemap: true, target: 'es2017' }],
  },
  transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)$', '^.(png)$'],
  coverageReporters: ['html'],
  coverageThreshold: {
    global: { branches: 0, functions: 0, lines: 0, statements: 0 },
  },
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  testEnvironment: 'jsdom',
  resetMocks: true,
  modulePaths: [],
};
