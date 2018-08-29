const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

module.exports = {
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: distPath,
        filename: '[name].[chunkhash:8].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name]-[contenthash:8].css'}),
        new HtmlWebpackPlugin({template: path.resolve(srcPath, 'index.html')})
    ]
};
