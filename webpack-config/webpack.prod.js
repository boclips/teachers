const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    performance: {
        hints: 'error',
        maxAssetSize: 3000000,
        maxEntrypointSize: 3000000
    },
    plugins: [
        // Cleans dist folder before building
        new CleanWebpackPlugin([distPath], {root: path.resolve(__dirname, '..')}),
    ]
});