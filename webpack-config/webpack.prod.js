const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        // Cleans dist folder before building
        new CleanWebpackPlugin([distPath], { root: path.resolve(__dirname , '..') }),
    ]
});