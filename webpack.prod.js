/* eslint-disable @typescript-eslint/no-var-requires */
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
// const { merge } = require("webpack-merge");
// const common = require("./webpack.common.js");
// const path = require("path");

// module.exports = merge(common, {
//   mode: "production",
//   devtool: "none",
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: path.join(__dirname, "src", "index.html"),
//     }),
//     new BundleAnalyzerPlugin(),
//   ],
//   performance: { hints: false },
// });

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
