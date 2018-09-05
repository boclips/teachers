const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const staticPath = path.resolve(__dirname, '../static');

module.exports = {
    entry: path.resolve(srcPath, 'index.tsx'),
    output: {
        path: distPath,
        filename: '[name].[chunkhash:8].js'
    },
    // Allows ts(x) and js files to be imported without extension
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
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name]-[contenthash:8].css'}),
        new HtmlWebpackPlugin({template: path.resolve(srcPath, 'index.html')}),
        new CopyWebpackPlugin([ { from: staticPath, to: distPath } ]),
    ]
};
