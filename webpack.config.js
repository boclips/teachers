const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = {
    "mode": "development",
    "entry": path.resolve(srcPath, "index.js"),
    "output": {
        "path": distPath,
        "filename": "[name].[chunkhash:8].js"
    },
    "devtool": "source-map",
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            },
            {
                "test": /\.less$/,
                "use": [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    "plugins": [new MiniCssExtractPlugin({filename: "[name]-[contenthash:8].css"})]
}
