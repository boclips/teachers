const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/v1/**': {
              target: 'https://video-service.staging-boclips.com/',
                changeOrigin: true,
            },
        },
    },
});
