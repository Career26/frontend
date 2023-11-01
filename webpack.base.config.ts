import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';
const tsConfig = require('./tsconfig.json');

export const alias = Object.keys(tsConfig.compilerOptions.paths).reduce((agg, jsPath) => {
  const pathName = jsPath.replace('/*', '');
  const newPath = tsConfig.compilerOptions.paths[jsPath][0].replace('/*', '').replace('./', '');
  return { ...agg, [pathName]: path.resolve(__dirname, newPath) };
}, {});

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
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['svg-url-loader'],
      },
      {
        test: /\.png$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
  ],
};

export default config;
