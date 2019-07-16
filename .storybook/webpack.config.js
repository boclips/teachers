const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = require('../webpack-config/webpack.common.js');

module.exports = ({ config }) => {
  const newRules = config.module.rules.reduce((acc, rule) => {
    if (/static\/media\//.test(rule.query && rule.query.name)) {
      return acc;
    } else {
      acc.push(rule);
    }

    return acc;
  }, []);

  return merge.smart(
    {
      ...config,
      module: {
        ...config.module,
        rules: newRules,
      },
    },
    {
      module: {
        rules: [
          ...common.module.rules,
          {
            test: /.svg$/i,
            exclude: /node_modules/,
            loader: 'svg-react-loader',
            options: {
              props: {
                role: 'img',
              },
            },
          },
        ],
      },
      resolve: common.resolve,
      plugins: [
        new MiniCssExtractPlugin({ filename: '[name]-[contenthash:20].css' }),
        new CopyWebpackPlugin([{ from: './static', to: './dist' }]),
      ],
    },
  );
};
