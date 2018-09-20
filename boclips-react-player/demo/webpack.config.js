const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'App.tsx'),
  output: {
    path: distPath,
    filename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  devServer: {
    contentBase: distPath,
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
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          'image-webpack-loader'
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: '[name]-[contenthash:8].css'}),
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'index.html')})
  ]
};
