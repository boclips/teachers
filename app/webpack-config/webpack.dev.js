const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const googleAnalyticsId = 'UA-126218810-1';
const stagingUrl = 'https://video-service.staging-boclips.com/';
const localUrl = 'http://localhost:8080/';
const srcPath = path.resolve(__dirname, '../src');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/v1/**': {
        target: stagingUrl,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      ga: googleAnalyticsId
    }),
  ]
});
