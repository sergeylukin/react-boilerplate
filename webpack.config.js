var path    = require('path');
var hwp     = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: 'index.bundle.js',
    path: path.join(__dirname, '/dist')
  },
  mode: process.env.NODE_ENV || "development",
  resolve: { modules: [path.resolve(__dirname, "src"), "node_modules"] },
  devServer: { contentBase: path.join(__dirname, "src") },
  module:{
    rules:[{
      exclude: /node_modules/,
      test: /\.js$/,
      use: ['babel-loader'],
    },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ]
      },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"]
        }],
    },
    plugins:[
      new MiniCssExtractPlugin({
        linkType: 'text/css',
      }),
      new hwp({template:path.join(__dirname, '/src/index.html')}),
    ]
}

