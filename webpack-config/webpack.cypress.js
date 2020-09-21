const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const staticPath = path.resolve(__dirname, '../static');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  // Allows ts(x) and js files to be imported without extension
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@ant-design/icons/lib/': path.resolve(
        __dirname,
        '../resources/icons.ts',
      ),
      src: path.resolve(__dirname, '../src'),
      resources: path.resolve(__dirname, '../resources'),
      'test-support': path.resolve(__dirname, '../test-support'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'lib',
                  }),
                ],
              }),
            },
          },
        ],
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.module.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
      {
        test: /.svg$/i,
        exclude: /node_modules/,
        oneOf: [
          {
            loader: 'svg-react-loader',
            options: {
              props: {
                role: 'img',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      ga: 'replaced-by-profile',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: staticPath, to: distPath },
        {
          from: './resources/youtube-play.svg',
          to: 'resources',
        },
      ],
    }),
  ],
};
