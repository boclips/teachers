const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const googleAnalyticsId = "does-not-matter";
const stagingUrl = "https://api.testing-boclips.com";
const srcPath = path.resolve(__dirname, "../src");
const localPort = 8081;

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    port: localPort,
    proxy: {
      "/v1/**": {
        target: stagingUrl,
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
          var originalBody = Buffer.from([]);

          proxyRes.on('data', function (data) {
            originalBody = Buffer.concat([originalBody, data]);
          });

          proxyRes.on('end', function () {
            var apiUrlPattern = 'https:\\/\\/api\\.testing-boclips\\.com\\/v1\\/';
            var proxiedApiUrl = `http://localhost:${localPort}/v1/`;
            const bodyWithRewrittenLinks =
              originalBody.toString('UTF-8').replace(new RegExp(apiUrlPattern, 'gm'), proxiedApiUrl);
            console.log(`Proxied request... replacing ${apiUrlPattern} with ${proxiedApiUrl}`);
            res.status(proxyRes.statusCode);
            res.write(bodyWithRewrittenLinks);
            res.end();
          });
        },
        selfHandleResponse: true,
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(srcPath, "index.html"),
      ga: googleAnalyticsId
    })
  ]
});
