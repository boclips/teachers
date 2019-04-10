const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var webpack = require('webpack');

const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const distPath = path.resolve(__dirname, '../dist');
const srcPath = path.resolve(__dirname, '../src');

const googleAnalyticsId = 'UA-126218810-2';
const oneMegaByte = 1024 * 1024;

module.exports = merge(common, {
  output: {
    filename: '[name].[chunkhash].js',
  },
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  performance: {
    hints: 'error',
    maxAssetSize: 4 * oneMegaByte,
    maxEntrypointSize: 4 * oneMegaByte,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      ga: googleAnalyticsId,
    }),
    new CleanWebpackPlugin([distPath], { root: path.resolve(__dirname, '..') }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],

  devtool: 'source-map',
});
