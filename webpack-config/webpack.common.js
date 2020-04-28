const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const staticPath = path.resolve(__dirname, '../static');

module.exports = {
  entry: path.resolve(srcPath, 'index.tsx'),
  output: {
    path: distPath,
    filename: '[name]-[contenthash:20].js',
    publicPath: '/',
  },
  // Allows ts(x) and js files to be imported without extension
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve(
        __dirname,
        '../resources/icons.ts',
      ),
      'src': path.resolve(__dirname, '../src'),
      'resources': path.resolve(__dirname, '../resources'),
      'test-support': path.resolve(__dirname, '../test-support'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
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
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /.svg$/i,
        exclude: /node_modules/,
        oneOf: [
          {
            loader: ['file-loader', 'image-webpack-loader'],
            resourceQuery: /inline/,
          },
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
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: ['file-loader', 'image-webpack-loader'],
      },
      {
        test: /\.svg$/i,
        include: /node_modules/,
        use: ['file-loader', 'image-webpack-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name]-[contenthash:20].css' }),
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, 'index.html'),
      ga: 'replaced-by-profile',
    }),
    new CopyWebpackPlugin([
      { from: staticPath, to: distPath },
      {
        from: './static/assets/youtube-sprite.svg',
        to: '../dist/assets',
      },
    ]),
  ],
};
