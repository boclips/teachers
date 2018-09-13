const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const stagingUrl = 'https://video-service.staging-boclips.com/';
const localUrl = 'http://localhost:8080/';

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/v1/**': {
        target: localUrl,
        changeOrigin: true,
      },
    },
  },
});
