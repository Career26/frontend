import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
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
    new DefinePlugin({
      'process.env.PROD': 'production',
    }),
  ],
};

export default config;
