const path = require("path");

const INDIR = "src";
const OUTDIR = "dist";

const webpack = require("webpack");
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
// const OptimizePlugin = new OptimizeJsPlugin({
//   sourceMap: false
// })

module.exports = {
  target: "web",
  context: path.resolve(__dirname, INDIR),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, OUTDIR),
    filename: "bundle-common.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    compress: true, // enable gzip compression
    hot: true // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
  HotModuleReplacementPlugin,
    // OptimizePlugin
  ]
};
