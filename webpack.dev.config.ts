import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import baseWebpackConfig from './webpack.base.config';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';

interface WebpackConfig extends Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: WebpackConfig = {
  ...baseWebpackConfig,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { plugins: ['react-refresh/babel'] } },
      },
      ...(baseWebpackConfig.module?.rules || []),
    ],
  },
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    ...(baseWebpackConfig.plugins || []),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new Dotenv(),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    historyApiFallback: true,
    port: 3000,
    open: true,
    hot: true,
  },
};

export default config;
