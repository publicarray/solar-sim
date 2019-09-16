import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';

export default {
  target: "web",
  context: path.resolve(__dirname, 'src'),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle-common.js"
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader'
        }]
      }]
  },
  devServer: {
    compress: true, // enable gzip compression
    hot: true // hot module replacement. Depends on HotModuleReplacementPlugin
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.join(__dirname, 'index.html')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
    // OptimizePlugin
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
