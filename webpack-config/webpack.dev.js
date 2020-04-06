require('dotenv').config({ path: '.env.dev' });
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

const googleAnalyticsId = 'does-not-matter';

const srcPath = path.resolve(__dirname, '../src');
const localPort = 8081;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    port: localPort,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index-dev.html'),
      ga: googleAnalyticsId,
    }),
    new webpack.EnvironmentPlugin(['ENVIRONMENT_DOMAIN']),
    new DynamicCdnWebpackPlugin({
      exclude: ['react-router', 'react-router-dom'],
    }),
  ],
});
