const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      maxSize: 3 * oneMegaByte,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        }
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
  },
  performance: {
    hints: 'error',
    maxAssetSize: 6 * oneMegaByte,
    maxEntrypointSize: 6 * oneMegaByte,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      ga: googleAnalyticsId,
    }),
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.svg$|\.png$/,
    }),
    new DynamicCdnWebpackPlugin({
      exclude: ['react-router', 'react-router-dom'],
    }),
    new webpack.EnvironmentPlugin(['SENTRY_RELEASE']),
  ],

  devtool: 'source-map',
});
