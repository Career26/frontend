import path from 'path';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import baseWebpackConfig from './webpack.base.config';

const config: Configuration = {
  ...baseWebpackConfig,
  mode: 'production',
  output: {
    ...baseWebpackConfig.output,
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  optimization: { minimize: true },
  plugins: [
    ...(baseWebpackConfig.plugins || []),
    new MiniCssExtractPlugin({ filename: 'style.[contenthash].css' }),
  ],
};

export default config;
