import { Configuration } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const tsConfig = require('./tsconfig.json');

export const alias = Object.keys(tsConfig.compilerOptions.paths).reduce((agg, jsPath) => {
  const pathName = jsPath.replace('/*', '');
  const newPath = tsConfig.compilerOptions.paths[jsPath][0].replace('/*', '').replace('./', '');
  return { ...agg, [pathName]: path.resolve(__dirname, newPath) };
}, {});

const devMode = process.env.NODE_ENV !== 'production';

const CSSInject = devMode ? 'style-loader' : MiniCssExtractPlugin.loader;

const config: Configuration = {
  entry: './src/index.tsx',
  resolve: {
    roots: [__dirname],
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

export default config;
