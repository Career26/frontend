/* eslint-env node */

const prettierConfig = require('./.prettierrc');

module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    exmaVersion: 12,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['coverage', 'build', 'dist', '.eslintrc.js', 'webpack**', 'jest**'],
  plugins: ['react', 'jest', 'sonarjs', 'prettier'],
  root: true,
  globals: { document: true, __dirname: true },
  overrides: [
    {
      files: ['**/*.test.*'],
      rules: {
        'import/no-extraneous-dependencies': 0,
      },
    },
  ],
  rules: {
    curly: ['error', 'all'],
    'prettier/prettier': ['error', { ...prettierConfig }],
    '@typescript-eslint/no-var-requires': 0,
    'import/prefer-default-export': 0,
    'react/function-component-definition': 0,
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always',
      },
    ],
  },
};
