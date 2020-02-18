const merge = require('webpack-merge');
const path = require('path');
const CopyWebPackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new CopyWebPackPlugin([
      {
        from: path.join(__dirname, '..', '/src')
      }
    ]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', '/public/index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
});
