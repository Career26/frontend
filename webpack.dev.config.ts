import path from 'path';
import { Configuration, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import baseWebpackConfig from './webpack.base.config';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

interface WebpackConfig extends Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: WebpackConfig = {
  ...baseWebpackConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    ...(baseWebpackConfig.plugins || []),
    new HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
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
